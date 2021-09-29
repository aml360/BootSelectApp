import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'sharedInterfaces/Entities';
import { AdminAddDTO } from 'src/DTO/user.DTO';
import { User } from 'src/entity/user.entity';
import { SetRoles } from 'src/modules/role/decorators/role.decorator';
import { UserService } from '../services/profesores.service';

@Controller('api/teachers')
export class TeachersController {
	constructor(private userSv: UserService) {}

	@SetRoles(Roles.ADMIN)
	@Get('')
	async getAllTeachers(): Promise<User[]> {
		return this.userSv.getAll();
	}

	@SetRoles(Roles.ADMIN)
	@UsePipes(new ValidationPipe({ transform: true, transformOptions: { excludeExtraneousValues: true } }))
	@Post('')
	async registerAdmin(@Body() admin: AdminAddDTO): Promise<true> {
		console.log(admin);
		await this.userSv.registerAdmin(admin);
		return true;
	}
}
