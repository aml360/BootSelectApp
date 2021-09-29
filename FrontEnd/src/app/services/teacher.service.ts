import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdminAddDTO } from 'sharedInterfaces/DTO';
import { IUser } from 'sharedInterfaces/Entities';
import { environment as env } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private httpClient: HttpClient) {}
	//TODO: Change all comments to english
	/**
	 * Method that returns all teachers from database without the encrypted password
	 * @returns La promesa que contendrá el array de profesores
	 */
	getAdmins(): Promise<IUser[]> {
		return this.httpClient.get<IUser[]>(`${env.API_URL}/teachers`).toPromise();
	}

	registerAdmin(admin: IAdminAddDTO): Promise<true> {
		return this.httpClient.post<true>(`${env.API_URL}/teachers`, admin).toPromise();
	}
}
