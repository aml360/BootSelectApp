import { Module } from '@nestjs/common';
import { OrdenadoresService } from './ordenadores.service';

@Module({
	providers: [OrdenadoresService],
})
export class OrdenadoresModule {}
