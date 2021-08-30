import { IDiskGetDTO } from '.';

export interface IComputerGetDTO {
	id: string;
	ip: string;
	createdAt: Date;
	updatedAt: Date;
	discos: IDiskGetDTO[];
}
