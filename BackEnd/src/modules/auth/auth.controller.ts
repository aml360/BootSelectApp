import { Controller, Post, Body, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { SigninDTO } from 'src/DTO';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
	constructor(
		private readonly _authService: AuthService, // private kCloak: KeycloakService,
	) {}

	// @Post('signup')
	// // @UsePipes(ValidationPipe)
	// async signup(@Body() signupDto: SignupDto) {
	// 	// return false;
	// 	return await this._authService.signup(signupDto);
	// }

	@Post('signin')
	@UsePipes(new ValidationPipe({ transform: true, transformOptions: { excludeExtraneousValues: true } }))
	signin(@Body() signinDto: SigninDTO): Promise<{ token: string }> {
		return this._authService.signin(signinDto);
	}

	@Post('jwtrefresh')
	async jwtRefresh(@Body() tokenJson: { tokenStr: string }) {
		const tokenStr = tokenJson.tokenStr;
		if (!tokenStr || tokenStr == null) {
			throw new BadRequestException('El token mandado es null o undefined');
		}
		return this._authService.renewToken(tokenStr);
	}
}
