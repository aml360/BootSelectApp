import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ClassService, DiskService } from 'src/app/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllClassroomsComponent } from './all-classrooms/all-classrooms.component';
import { ClassroomTableComponent } from './clase-table/classroom-table.component';

const routes: Routes = [
	{
		path: '',
		component: AllClassroomsComponent,
	},
	{
		path: ':classId',
		component: ClassroomTableComponent,
	},
];

@NgModule({
	declarations: [ClassroomTableComponent, AllClassroomsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		NgxMaterialTimepickerModule,
		FormsModule,
	],
	providers: [ClassService, DiskService],
})
export class ClassroomModule {}
