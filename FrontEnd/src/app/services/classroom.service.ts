import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClassroomGetDTO, IClassroomInfoGetDTO } from 'sharedInterfaces/DTO';
import { environment as env } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ClassService {
	constructor(private httpClient: HttpClient) {}
	// TODO: Dto not entity
	/**
	 * Method that asks backend to retrieve all arduinos info from ONE class, id passed as parameter
	 * returns
	 */
	getClassInfo(classId: string): Promise<IClassroomInfoGetDTO> {
		return this.httpClient.get<IClassroomInfoGetDTO>(`${env.API_URL}/classrooms/${classId}`).toPromise();
	}

	// TODO: Dto not entity
	/**
	 * Method that gets all information from ALL classes
	 * @returns Array with all classes and their information
	 */
	getAllClasses(): Promise<IClassroomGetDTO[]> {
		return this.httpClient.get<IClassroomGetDTO[]>(`${env.API_URL}/classrooms`).toPromise();
	}
}
