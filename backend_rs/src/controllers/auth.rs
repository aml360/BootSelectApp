use rocket::response::content::Json;
// Promise<{
// token: string;
// }>
#[post("/auth/signin")]
pub fn signin() -> Json<&'static str> {
    Json("Hola")
}

// export interface IJwtPayload {
// username: string;
// email: string;
// password: string;
// roles: RoleType[];
// iat?: Date;
// }


// async signin(signinDto: SigninDto): Promise<{ token: string }> {
// 	console.log('signin', signinDto);
// 	const errMsg: string = 'Incorrect user or password';
// 	const { username, password } = signinDto;
// 	const user: User = await this.userRepository.findOne({
// 		where: { username },
// 	});
// 	console.log(user);
// 	if (!user) {
// 		throw new UnauthorizedException(errMsg);
// 	}
// 	if (!user.active) {
// 		throw new UnauthorizedException('User not verified');
// 	}
// 	let isMatch: boolean;
// 	try {
// 		isMatch = compareSync(password, user.password);
// 	} catch (error) {
// 		isMatch = false;
// 	}
// 	if (!isMatch) {
// 		throw new UnauthorizedException(errMsg);
// 	}

// 	const payload: IJwtPayload = {
// 		email: user.email,
// 		username: user.username,
// 		password: user.password,
// 		roles: user.roles.map(r => r.name as RoleType),
// 	};

// 	const token = this._jwtService.sign(payload);
// 	return { token };
// }
