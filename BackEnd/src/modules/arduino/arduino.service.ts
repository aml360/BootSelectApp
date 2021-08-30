import { Injectable, NotFoundException } from '@nestjs/common';
import { Disk } from 'src/entity/disco.entity';
import { PcRepo } from '../computer/ordenadores.repository';
import { ArduinoDTO } from './dto/arduino.dto';

@Injectable()
export class ArduinoService {
	constructor(private pcRepo: PcRepo) {}

	async getArduinoInfo(id: string): Promise<void> {
		const pc = await this.pcRepo.findOne({ id }, { relations: ['discos'] });
		if (!pc) {
			throw new NotFoundException(`Pc with id ${id} not found`);
		}
		let arduinoDTO: ArduinoDTO;
		pc.discos!.forEach(disk =>
			arduinoDTO.discos.push({
				boot: disk.bootUp,
				shutdown: disk.shutdown,
				upNow: this.calculateUpNow(disk),
			}),
		);
	}

	calculateUpNow(disk: Disk): boolean {
		// TODO: Refactor and complete
		/** Actual date with actual hour and minute, used for comparison */
		const t = new Date();
		const bootTime = new Date();
		const shutdownTime = new Date();
		console.log(disk.id, disk.bootUp.getHours());
		bootTime.setHours(disk.bootUp.getHours());
		bootTime.setMinutes(disk.bootUp.getMinutes());
		shutdownTime.setHours(disk.shutdown.getHours());
		shutdownTime.setMinutes(disk.shutdown.getMinutes());
		console.log(t, bootTime, shutdownTime);
		let result: boolean = false;
		console.log(t < shutdownTime);
		console.log(t > shutdownTime && bootTime > t);

		if (t < shutdownTime && t > bootTime) {
			result = true;
		} else if (bootTime < t) {
			result = true;
		}
		// && disk.shutdown.getHours() > t.getHours()
		return result;
	}
}
