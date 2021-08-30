import { IClassroom, Roles, RoleStatus } from '.';

/**
 * TODO: tsdoc in english, add example
 */
export interface IUser {
	username: string;
	password: string;
	email?: string;
	name: string;
	lastname: string;
	createdAt: Date;
	updatedAt: Date;
	roles?: IRole[];
	clases?: IClassroom[];
	active: boolean;
}

export interface IRole {
	id: number;
	name: Roles;
	description: string;
	users?: IUser[];
	status: RoleStatus;
	createdAt: Date;
	updatedAt: Date;
}
