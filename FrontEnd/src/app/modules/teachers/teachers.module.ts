import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersTableComponent } from './teachers-table/teachers-table.component';
import { RouterModule, Routes } from '@angular/router';
import { NewTeacherComponent } from './new-teacher/new-teacher.component';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
	{
		path: '',
		component: TeachersTableComponent,
	},
];
@NgModule({
	declarations: [TeachersTableComponent, NewTeacherComponent],
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class TeachersModule {}
