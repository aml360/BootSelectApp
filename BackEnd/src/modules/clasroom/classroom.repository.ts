import { Classroom } from 'src/entity/clase.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Classroom)
export class ClassroomRepo extends Repository<Classroom> {}
