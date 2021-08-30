import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomController } from './classroom.controller';
import { ClassroomRepo } from './classroom.repository';

@Module({
	controllers: [ClassroomController],
	imports: [TypeOrmModule.forFeature([ClassroomRepo])],
	providers: [],
})
export class ClassroomModule {}
