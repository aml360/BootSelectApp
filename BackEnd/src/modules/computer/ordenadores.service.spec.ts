import { Test, TestingModule } from '@nestjs/testing';
import { OrdenadoresService } from './ordenadores.service';

describe('OrdenadoresService', () => {
	let service: OrdenadoresService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [OrdenadoresService],
		}).compile();

		service = module.get<OrdenadoresService>(OrdenadoresService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
