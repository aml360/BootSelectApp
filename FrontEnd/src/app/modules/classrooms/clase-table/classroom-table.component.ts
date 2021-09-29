import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClassroomInfoGetDTO, IComputerGetDTO, IDiskUpdateDTO } from 'sharedInterfaces/DTO';
import { ClassService, DiskService } from 'src/app/services';

// TODO: Refactor Component and remove all identifiers with spanish naming, change to english ones.
@Component({
	selector: 'app-classroom-table',
	templateUrl: './classroom-table.component.html',
	styleUrls: ['./classroom-table.component.scss'],
})
export class ClassroomTableComponent implements OnInit {
	constructor(
		private classService: ClassService,
		private route: ActivatedRoute,
		private diskService: DiskService,
	) {}

	classId: string = this.route.snapshot.paramMap.get('classId')!;
	classInfo!: IClassroomInfoGetDTO;
	ordenadores: IComputerGetDTO[] = [];

	async ngOnInit() {
		this.classInfo = await this.classService.getClassInfo(this.classId);
		this.ordenadores = this.classInfo.ordenadores;
		// this.ordenadores.forEach(pc =>
		// 	pc.discos.forEach(disk => {
		// 		disk.bootUp = new Date(disk.bootUp);
		// 		disk.shutdown = new Date(disk.shutdown);
		// 	}),
		// );
		console.log(this.ordenadores);
	}

	// TODO: TSdoc in english
	/**
	 * Función que usa el servicio para actualizar el tiempo de encendido y el de apagado de los discos
	 * @param disco El disco a actualizar el tiempo
	 * @param time El time con formato hh:mm
	 * @param boot `true` si el timestamp a actualizar es el de encendido, `false` si es el de apagado
	 */
	async persistTime(disco: IDiskUpdateDTO, time: string, boot: boolean) {
		const timeArrStr = time.split(':');
		const timeArr: number[] = [];
		timeArrStr.forEach(x => timeArr.push(+x));
		let timeDate = new Date();
		timeDate.setHours(timeArr[0]);
		timeDate.setMinutes(timeArr[1]);
		if (boot) {
			disco.bootUp = timeDate;
		} else {
			disco.shutdown = timeDate;
		}
		try {
			await this.diskService.updateDisk(disco);
		} catch (error) {
			alert('No se ha actualizado correctamente');
		}
	}

	// TODO: TSdoc in english
	/**
	 * Metodo usado para transformar la fecha proviniente de la base de datos en una que entiende el timepicker
	 * @param time DateTime con formato hh:mm:ss
	 * @returns El datetime como string con formato hh:mm
	 */
	formatTime(time: Date): string {
		console.log(typeof time);
		//Formato recibido: Timestamp de postgres
		return time.getHours() + ':' + time.getMinutes();
	}
}
