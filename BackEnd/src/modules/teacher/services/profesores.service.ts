import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { TeacherRepository } from '../profesores.repository';
import { deleteProps } from 'sharedCode/utility';
import { AdminAddDTO } from 'src/DTO/user.DTO';
import { Roles } from 'sharedInterfaces/Entities';
import { RoleRepository } from 'src/modules/role/role.repository';
import { Role } from 'src/entity';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private profRepo: TeacherRepository, private readonly roleRepo: RoleRepository) {}

	/**
	 * Method that go to database and retieves all teachers, actually Users are teachers so this method remove the encrypted password.
	 * @returns The teachers array without the encrypted password.
	 */
	async getAll(): Promise<User[]> {
		const users = await this.profRepo.find();
		users.forEach(user => deleteProps(user, ['password']));
		return users;
	}

	/**
	 * Try to save a new admin user, if exist some user with that username, exception will be thrown.
	 * @throws
	 * @returns The teacher saved
	 */
	async registerAdmin(admin: AdminAddDTO): Promise<User> {
		const [adminInDb, adminRole, publicRole] = await Promise.all([
			this.profRepo.findOne(admin.username),
			this.roleRepo.findOne({ where: { name: Roles.ADMIN } }),
			this.roleRepo.findOne({ where: { name: Roles.PUBLIC } }),
		]);
		if (!!adminInDb) {
			throw new BadRequestException(`User ${admin.username} already exists`);
		}
		if (!adminRole) {
			throw new InternalServerErrorException(`Admin role could not be found in DB`);
		}
		if (!publicRole) {
			throw new InternalServerErrorException(`Public role could not be found in DB`);
		}
		const adminR = admin as AdminAddDTO & { roles: User['roles']; active: User['active'] };
		adminR.password = hashSync(adminR.password, 10);
		adminR.roles = [adminRole, publicRole];
		adminR.active = true;
		console.log(adminR);
		return this.profRepo.save(adminR);
	}
}
