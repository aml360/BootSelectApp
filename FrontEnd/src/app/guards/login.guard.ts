import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment as env } from 'src/environments/environment';
import { AppRoute } from '../types/AppRoute';
import { Roles } from 'sharedInterfaces/Entities';
import { JwtService } from 'src/app/services';
import { IJwtPayload } from 'sharedInterfaces/DTO';
import { intersection } from 'lodash';

@Injectable()
export class LoginGuard implements CanLoad {
	//En caso de usar una ruta varias veces guardarla en una variable, si son mas en un objeto.

	constructor(
		private jwtHelperSv: JwtHelperService,
		private readonly jwtSv: JwtService,
		private router: Router,
	) {}

	canLoad(route: AppRoute): boolean {
		const token = this.jwtSv.getToken();
		/**
		 * Redirige al usuario al login, añadiendo como parametro la url solicitada para poder volver al logarse
		 * @see [Tutorial seguido](https://bit.ly/3qfwR4V)
		 */
		const toLogin = () =>
			this.router.navigate([env.LOGIN_ROUTE], {
				queryParams: { returnUrl: route.path },
			});

		const conditionsToLogin =
			// Route does not contain data
			!route.data ||
			// Or not requires any role
			!route.data.roles ||
			// Or (token exist and isn't expired and has one or more roles that route requires).
			(!!token &&
				!this.jwtHelperSv.isTokenExpired(token) &&
				intersection(this.jwtHelperSv.decodeToken<IJwtPayload>(token).roles, route.data.roles).length > 0);

		if (conditionsToLogin) {
			return true;
		} else {
			toLogin();
			return false;
		}
	}

	/**
	 * Metodo que comprueba si en el jwt el usuario tiene el rol introducido como parametro.
	 * Este metodo adquiere el token del localStorage.
	 *
	 * No le pide al backend información para ver si el token es valido, es decir usarlo solo para la interfaz no para auth
	 *
	 * @param role El rol a comprobar en el jwt
	 * @returns `True` si el rol esta en el token y `false` en caso contrario
	 */
	hasRole(role: Roles): boolean {
		const token = this.jwtSv.getToken();
		if (
			!!token &&
			!this.jwtHelperSv.isTokenExpired(token) &&
			this.jwtHelperSv.decodeToken<IJwtPayload>(token).roles.includes(role)
		) {
			return true;
		} else {
			return false;
		}
	}
}
