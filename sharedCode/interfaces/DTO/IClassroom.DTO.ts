import { IUser } from 'sharedInterfaces/Entities';
import { IComputerGetDTO } from '.';

export interface IClassroomGetDTO {
	id: string;
	name: string;
	description: string;
	profesores: IUser['username'][];
	createdAt: Date;
	updatedAt: Date;
}

export interface IClassroomInfoGetDTO {
	id: string;
	name: string;
	description: string;
	profesores: IUser['username'][];
	ordenadores: IComputerGetDTO[];
	createdAt: Date;
	updatedAt: Date;
}
