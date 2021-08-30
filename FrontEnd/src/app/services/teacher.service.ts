import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'sharedInterfaces/Entities';
import { environment as env } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TeacherService {
	constructor(private httpClient: HttpClient) {}
	//TODO: Change all comments to english
	/**
	 * Method that returns all teachers from database without the encrypted password
	 * @returns La promesa que contendrá el array de profesores
	 */
	getTeachers(): Promise<IUser[]> {
		return this.httpClient.get<IUser[]>(`${env.API_URL}/teachers`).toPromise();
	}
}
