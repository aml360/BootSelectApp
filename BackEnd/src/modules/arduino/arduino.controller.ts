import { Controller, Get, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { PcRepo } from '../computer/ordenadores.repository';
import { ArduinoService } from './arduino.service';
import {
	Interval,
	getDay,
	setDay,
	setDayOfYear,
	setMonth,
	setYear,
	getMonth,
	getYear,
	isWithinInterval,
	addDays,
	addBusinessDays,
} from 'date-fns';
import { Disk } from 'src/entity';

export type ArduinoTimesDTO = { id: number; activeNow: boolean };
@Controller('api/arduino')
export class ArduinoController {
	constructor(private arduinoService: ArduinoService, private pcRepo: PcRepo) {}

	@Get(':id')
	async getArduinoTimes(@Param('id') id: string): Promise<string> {
		const pc = await this.pcRepo.findOne({ id }, { relations: ['discos'] });
		if (!pc) {
			throw new NotFoundException(`Pc with id ${id} not found`);
		}
		if (!pc.discos) {
			console.error(`Relations of pc not loaded properly, check arduino.controller.ts line 17`);
			throw new InternalServerErrorException(`Contact with a programmer`);
		}
		const discoPrueba = pc.discos[0]!;
		console.log(discoPrueba.bootUp, discoPrueba.shutdown);
		const now = new Date();
		const result = pc.discos.reduce<string>((acc, disk: Disk) => {
			const diskInterval: Interval = { start: disk.bootUp, end: disk.shutdown };
			let isBooted: boolean = false;
			try {
				isBooted = isWithinInterval(now, diskInterval);
			} catch (error) {
				diskInterval.end = addDays(diskInterval.end, 1);
				isBooted = isWithinInterval(now, diskInterval);
			}
			acc = acc.concat(`${disk.id}${isBooted ? 1 : 0}`);
			return acc;
		}, '');


		return result.concat('f');
	}
	@Get('v2/:id')
	async getArduinoTimesJson(@Param('id') id: string): Promise<ArduinoTimesDTO[]> {
		const pc = await this.pcRepo.findOne({ id }, { relations: ['discos'] });
		if (!pc) {
			throw new NotFoundException(`Pc with id ${id} not found`);
		}
		if (!pc.discos) {
			console.error(`Relations of pc not loaded properly, check arduino.controller.ts line 17`);
			throw new InternalServerErrorException(`Contact with a programmer`);
		}
		// let response: ArduinoTimesDTO[] = [];
		// pc.discos!.forEach(disk => {
		// 	response.push({ id: disk.id, activeNow: this.arduinoService.calculateUpNow(disk) });
		// });
		return pc.discos.reduce<ArduinoTimesDTO[]>((acc, disk) => {
			acc.push({ id: disk.id, activeNow: this.arduinoService.calculateUpNow(disk) });
			return acc;
		}, []);
	}
}
