import { Disk } from 'src/entity/disco.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Disk)
export class DiskRepo extends Repository<Disk> {}
