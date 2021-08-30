import { IComputer, IDisk } from 'sharedInterfaces/Entities';

export interface IDiskGetDTO {
	id: IDisk['id'];
	description: string;
	bootUp: Date;
	shutdown: Date;
	// ordenador?: IComputer['id'];
}

export interface IDiskUpdateDTO {
	id: IDisk['id'];
	description?: string;
	bootUp?: Date;
	shutdown?: Date;
	ordenador?: IComputer['id'];
}
