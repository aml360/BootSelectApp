import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { IJwtPayload } from 'sharedInterfaces/DTO';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly _configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'eeee',
		});
	}

	async validate(payload: IJwtPayload) {
		// const { username } = payload;
		// const user = await this._authRepository.findOne({
		//   where: { username, status: 'ACTIVE' },
		// });

		// if (!user) {
		//   throw new UnauthorizedException();
		// }

		return payload;
	}
}
