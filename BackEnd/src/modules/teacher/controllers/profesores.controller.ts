import { Controller, Get } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { TeacherService } from '../services/profesores.service';

@Controller('api/teachers')
export class TeachersController {
	constructor(private profService: TeacherService) {}

	@Get('')
	async getAllTeachers(): Promise<User[]> {
		return this.profService.getAll();
	}
}
