import { IClassroom } from '.';

export interface IComputer {
	id: string;
	ip: string;
	clase?: IClassroom;
	discos?: IDisk[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IDisk {
	/** Id autogenerado en base de datos, un disco lo tiene solo un ordenador */
	id: number;
	/** Descripción del disco como string, cualquier dato, puramente informativo */
	description?: string;
	/** El ordenador al que pertenece el disco, puede ser undefined si la petición es cargar los discos de un ordenador*/
	ordenador?: IComputer;
	/** Hora en la que el disco tendrá corriente si el ordenador esta encendido a partir de esa hora */
	bootUp: Date;
	/** Hora en la que el disco NO tendrá corriente si el ordenador esta encendido a partir de esa hora */
	shutdown: Date;
}
