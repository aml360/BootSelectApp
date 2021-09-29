import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { TeachersController } from './controllers/profesores.controller';
import { TeacherRepository } from './profesores.repository';
import { UserService } from './services/profesores.service';

@Module({
	imports: [TypeOrmModule.forFeature([TeacherRepository, RoleRepository])],
	controllers: [TeachersController],
	providers: [UserService],
})
export class ProfesoresModule {}
