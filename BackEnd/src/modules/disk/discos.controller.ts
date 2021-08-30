import { Body, Controller, NotFoundException, Put } from '@nestjs/common';
import { IDiskUpdateDTO } from 'sharedInterfaces/DTO';
import { Disk } from 'src/entity/disco.entity';
import { DeepPartial } from 'typeorm';
import { PcRepo } from '../computer/ordenadores.repository';
import { DiskRepo } from './discos.repository';

@Controller('api/disks')
export class DiscosController {
	constructor(private readonly diskRepo: DiskRepo, private readonly computerRepo: PcRepo) {}

	// TODO: DTO y validation pipe, setRoles and guard with roles
	@Put('timeupdate')
	async updateDiskTime(@Body() disk: Disk): Promise<boolean> {
		const diskToUpdate = await this.diskRepo.findOne({ id: disk.id });
		if (!diskToUpdate) {
			throw new NotFoundException('No existe ningun disco con ese id');
		}
		diskToUpdate.bootUp = disk.bootUp;
		diskToUpdate.shutdown = disk.shutdown;
		await this.diskRepo.save(diskToUpdate);
		return true;
	}

	async updateDisk(@Body() disk: IDiskUpdateDTO) {
		const diskToUpdate = await this.diskRepo.findOne(disk.id);

		if (!diskToUpdate) {
			throw new NotFoundException(`Disk with id: ${disk.id}, doesn't exist`);
		}
		if (!!disk.ordenador) {
			const computer = await this.computerRepo.findOne(disk.ordenador);
			if (!computer) {
				throw new NotFoundException(`No computer found with ${disk.ordenador} as id`);
			}
		}

		const updatedDisk = { ...diskToUpdate, ...disk };
		this.diskRepo.save(updatedDisk as unknown as DeepPartial<Disk>);
	}
}
