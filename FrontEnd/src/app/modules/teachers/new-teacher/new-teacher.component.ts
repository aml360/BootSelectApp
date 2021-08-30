import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAdminAddDTO } from 'sharedInterfaces/DTO';

class FormGroupExtended extends FormGroup {
	controls!: {
		[key: string]: AbstractControl;
	};
}

@Component({
	selector: 'app-new-teacher [modalId]',
	templateUrl: './new-teacher.component.html',
	styleUrls: ['./new-teacher.component.scss'],
})
export class NewTeacherComponent implements OnInit {
	@Input() modalId!: string;
	@Output() onTeacherSaved = new EventEmitter<IAdminAddDTO>();

	form!: FormGroupExtended;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			name: ['', Validators.required],
			surname: ['', Validators.required],
			// : ['', Validators.required],
		});
		console.log(this);
	}
	saveNewAdmin(): void {
		console.log(this.form);
	}
}
