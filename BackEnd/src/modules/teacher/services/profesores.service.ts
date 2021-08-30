import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { TeacherRepository } from '../profesores.repository';
import { deleteProps } from 'sharedCode/utility';

@Injectable()
export class TeacherService {
	constructor(private profRepo: TeacherRepository) {}

	/**
	 * Method that go to database and retieves all teachers, actually Users are teachers so this method remove the encrypted password.
	 * @returns The teachers array without the encrypted password.
	 */
	async getAll(): Promise<User[]> {
		const users = await this.profRepo.find();
		users.forEach(user => deleteProps(user, ['password']));
		return users;
	}
}
