import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IAdminAddDTO, IProfesorDTO } from 'sharedInterfaces/DTO';
import { IUser } from 'sharedInterfaces/Entities';
import { UserService } from 'src/app/services';

@Component({
	selector: 'app-teachers-table',
	templateUrl: './teachers-table.component.html',
	styleUrls: ['./teachers-table.component.scss'],
})
export class TeachersTableComponent implements OnInit {
	constructor(private userSv: UserService) {}

	closeChildrenModal = new Subject<true>();

	childrenIds = {
		newTeacherId: 'newTeacherModal',
	};
	teachers: IUser[] = [];
	teacherToAdd: IProfesorDTO | undefined;

	async ngOnInit(): Promise<void> {
		this.teachers = await this.userSv.getAdmins();
	}

	async onSaveNewAdmin(admin: IAdminAddDTO) {
		const registered = await this.userSv.registerAdmin(admin);
		if (registered) {
			this.closeChildrenModal.next(true);
			this.teachers = await this.userSv.getAdmins();
		}
	}
}
