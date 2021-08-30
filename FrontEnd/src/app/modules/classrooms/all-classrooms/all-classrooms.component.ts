import { Component, OnInit } from '@angular/core';
import { IClassroomGetDTO } from 'sharedInterfaces/DTO';
import { ClassService } from 'src/app/services';

@Component({
	selector: 'app-all-classrooms',
	templateUrl: './all-classrooms.component.html',
	styleUrls: ['./all-classrooms.component.scss'],
})
export class AllClassroomsComponent implements OnInit {
	constructor(private classService: ClassService) {}

	isDataLoaded = false;
	clases: IClassroomGetDTO[] = [];

	async ngOnInit(): Promise<void> {
		this.clases = await this.classService.getAllClasses();
		this.isDataLoaded = true;
	}
}
