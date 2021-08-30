import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PcRepo } from '../computer/ordenadores.repository';
import { DiscosController } from './discos.controller';
import { DiskRepo } from './discos.repository';

@Module({
	imports: [TypeOrmModule.forFeature([DiskRepo, PcRepo])],
	controllers: [DiscosController],
})
export class DiscosModule {}
