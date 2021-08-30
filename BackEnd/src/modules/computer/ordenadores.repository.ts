import { Computer } from 'src/entity/ordenador.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Computer)
export class PcRepo extends Repository<Computer> {}
