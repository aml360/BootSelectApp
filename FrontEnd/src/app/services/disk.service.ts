import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiskUpdateDTO } from 'sharedInterfaces/DTO';
import { environment as env } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class DiskService {
	constructor(private httpClient: HttpClient) {}
	/**
	 * Method to update one Disk
	 *
	 * @param disk The disk to update
	 * returns
	 */
	updateDisk(disk: IDiskUpdateDTO): Promise<boolean> {
		return this.httpClient.put<boolean>(`${env.API_URL}/disks/timeupdate`, disk).toPromise();
	}
}
