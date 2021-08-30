import { Injectable, ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync, compareSync } from 'bcrypt';
import { deleteProps } from 'sharedCode/utility';
import { IJwtPayload } from 'sharedInterfaces/DTO';
import { SigninDTO, SignupDTO } from 'src/DTO';
import { User } from 'src/entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
	constructor(
		private readonly _jwtService: JwtService,
		@InjectRepository(UserRepository) private userRepository: UserRepository,
	) {}

	async signup(signupDto: SignupDTO): Promise<boolean> {
		const usr = signupDto;
		const userExists = await this.userRepository.findOne({
			where: [{ username: usr.username }, { email: usr.email }],
		});
		if (userExists) {
			console.log('El usuario existe');
			throw new ConflictException('username or email already exists');
		}
		let user = User.buildFromRegister(signupDto);
		user.password = hashSync(user.password, 10);
		console.log(user);
		try {
			await user.save();
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	/**
	 *
	 * @param signinDto JSON with credentials
	 * @returns
	 */
	async signin(signinDto: SigninDTO): Promise<{ token: string }> {
		console.log('signin', signinDto);
		const errMsg: string = 'Incorrect user or password';
		const { username, password } = signinDto;
		const user = await this.userRepository.findOne({
			where: { username },
		});
		if (!user) {
			throw new UnauthorizedException(errMsg);
		}
		if (!user.active) {
			throw new UnauthorizedException('User not verified');
		}
		try {
			compareSync(password, user.password);
		} catch (error) {
			throw new UnauthorizedException(errMsg);
		}
		// iat and exp are omitted because that keys are setted by jwtService.sign method
		const payload: Omit<IJwtPayload, 'iat' | 'exp'> = {
			email: user.email,
			username: user.username,
			password: user.password,
			roles: user.roles.map(r => r.name),
			// roles: user.roles,
		};

		const token = this._jwtService.sign(payload);
		return { token };
	}
	/**
	 *	Verifica si el token mandando como string es valido, de ser asi renueva
	 *	la fecha de expiración y de expedición de este
	 * @param tokenStr El jwt como string
	 * @returns Retorna un token con el mismo payload pero distinto exp y iat.
	 * @throws {ForbiddenException}
	 */
	async renewToken(tokenStr: string): Promise<{ token: string }> {
		if (!this._jwtService.verify(tokenStr)) {
			throw new ForbiddenException('El token no es valido o ya ha expirado');
		}
		let tokenObj: IJwtPayload = this._jwtService.decode(tokenStr) as IJwtPayload;
		deleteProps(tokenObj, ['iat', 'exp']);
		const token = this._jwtService.sign(tokenObj);
		return { token };
	}
}
