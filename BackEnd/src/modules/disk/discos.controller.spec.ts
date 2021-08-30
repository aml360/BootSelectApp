import { Test, TestingModule } from '@nestjs/testing';
import { DiscosController } from './discos.controller';

describe('DiscosController', () => {
	let controller: DiscosController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DiscosController],
		}).compile();

		controller = module.get<DiscosController>(DiscosController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
