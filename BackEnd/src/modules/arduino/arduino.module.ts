import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiskRepo } from '../disk/discos.repository';
import { PcRepo } from '../computer/ordenadores.repository';
import { ArduinoController } from './arduino.controller';
import { ArduinoService } from './arduino.service';

@Module({
	controllers: [ArduinoController],
	providers: [ArduinoService],
	imports: [TypeOrmModule.forFeature([PcRepo, DiskRepo])],
})
export class ArduinoModule {}
