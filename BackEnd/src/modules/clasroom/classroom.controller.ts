import { Controller, Get, Param } from '@nestjs/common';
import { ClassroomGetDTO, ClassroomInfoGetDTO } from 'src/DTO/classroom.DTO';
import { ClassroomRepo } from './classroom.repository';

@Controller('api/classrooms')
export class ClassroomController {
	constructor(private claseRepo: ClassroomRepo) {}

	// TODO: DTO
	@Get('')
	async getAllClases(): Promise<ClassroomGetDTO[]> {
		return this.claseRepo.find() as unknown as Promise<ClassroomGetDTO[]>;
	}

	// TODO: DTO
	@Get(':id')
	async getClaseInfo(@Param('id') id: string): Promise<ClassroomInfoGetDTO> {
		return this.claseRepo.findOne(id, {
			relations: ['ordenadores', 'ordenadores.discos'],
		}) as unknown as Promise<ClassroomInfoGetDTO>;
	}
}
