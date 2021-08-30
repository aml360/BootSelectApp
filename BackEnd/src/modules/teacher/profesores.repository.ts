import { User } from 'src/entity/user.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class TeacherRepository extends Repository<User> {}
