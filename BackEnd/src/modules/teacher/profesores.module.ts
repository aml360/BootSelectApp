import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from './controllers/profesores.controller';
import { TeacherRepository } from './profesores.repository';
import { TeacherService } from './services/profesores.service';

@Module({
	imports: [TypeOrmModule.forFeature([TeacherRepository])],
	controllers: [TeachersController],
	providers: [TeacherService],
})
export class ProfesoresModule {}
