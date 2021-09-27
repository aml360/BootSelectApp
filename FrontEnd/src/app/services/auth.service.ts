import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { IRegisterRequestDTO, ISignInDto } from 'sharedInterfaces/DTO';

interface IAuthTokenRes {
	token: string;
}
@Injectable()
export class AuthService {
	constructor(private httpClient: HttpClient) {}

	/**
	 * Function that send the login information to api and set the jwt token if the information given is valid
	 *
	 * @param body Is the json object with username and password, email optional
	 * @return Return `true` if successful authentication, otherwise return `false`.
	 */
	async sendLoginInfo(body: ISignInDto): Promise<IAuthTokenRes> {
		return this.httpClient.post<IAuthTokenRes>(env.API_URL + '/signin', body).toPromise();
	}

	/**
	 *
	 * @param body  El cuerpo a enviar en la petición de registro
	 * @returns Promise q se resuelve como `true` si todo ha ido bien, `false` en caso contrario
	 */
	async sendRegisterReq(body: IRegisterRequestDTO): Promise<boolean> {
		const response: IAuthTokenRes = await this.httpClient
			.post<IAuthTokenRes>(env.API_URL + '/signup', body)
			.toPromise();
		console.log(response);
		if (!response) {
			return false;
		}
		return true;
	}
}
