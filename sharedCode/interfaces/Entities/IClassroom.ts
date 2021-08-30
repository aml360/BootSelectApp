import { IUser } from '.';
import { IComputer } from './IComputer';

export interface IClassroom {
	id: string;
	name: string;
	description: string;
	profesores: IUser[] | undefined;
	ordenadores: IComputer[];
}
