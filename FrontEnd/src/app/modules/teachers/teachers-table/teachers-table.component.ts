import { Component, OnInit } from '@angular/core';
import { IAdminAddDTO, IProfesorDTO } from 'sharedInterfaces/DTO';
import { IUser } from 'sharedInterfaces/Entities';
import { TeacherService } from 'src/app/services';

@Component({
	selector: 'app-teachers-table',
	templateUrl: './teachers-table.component.html',
	styleUrls: ['./teachers-table.component.scss'],
})
export class TeachersTableComponent implements OnInit {
	constructor(private teacherSrv: TeacherService) {}

	childrenIds = {
		newTeacherId: 'newTeacherModal',
	};
	teachers: IUser[] = [];
	teacherToAdd: IProfesorDTO | undefined;

	async ngOnInit(): Promise<void> {
		this.teachers = await this.teacherSrv.getTeachers();
		console.log(this.teachers);
	}

	onSaveNewAdmin(admin: IAdminAddDTO) {
		console.log(admin);
	}
}
