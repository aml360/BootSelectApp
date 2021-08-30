import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Roles } from 'sharedInterfaces/Entities';
import { LoginGuard } from './guards/login.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { AppRoute } from './types/AppRoute';

const routes: AppRoute[] = [
	{
		path: 'classrooms',
		canLoad: [LoginGuard],
		data: {
			roles: [Roles.ADMIN],
		},
		component: LayoutComponent,
		loadChildren: () => import('./modules/classrooms/clase.module').then(mod => mod.ClassroomModule),
	},
	{
		path: 'teachers',
		canLoad: [LoginGuard],
		data: {
			roles: [Roles.ADMIN],
		},
		component: LayoutComponent,
		loadChildren: () => import('./modules/teachers/teachers.module').then(mod => mod.TeachersModule),
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
	},
	{
		path: '',
		canLoad: [LoginGuard],
		data: {
			roles: [Roles.PUBLIC],
		},
		loadChildren: () => import('./modules/public/public.module').then(mod => mod.PublicModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
})
export class AppRoutingModule {}
