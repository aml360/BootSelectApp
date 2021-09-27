import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { RoleRepository } from '../role/role.repository';
import { Role, User } from 'src/entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly _userRepository: UserRepository,
		@InjectRepository(RoleRepository)
		private readonly _roleRepository: RoleRepository,
	) {}

	async getFromUsername(username: string): Promise<User> {
		if (!username) {
			throw new BadRequestException('Username must be sent');
		}

		const user = await this._userRepository.findOne(username, {
			where: { active: true },
		});

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	async getAll(): Promise<User[]> {
		return this._userRepository.find({
			where: { active: true },
		});
	}

	async create(user: User): Promise<User> {
		// const details = new UserDetails();
		// user.details = details;

		const repo = getConnection().getRepository(Role);
		const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
		user.roles = [defaultRole!];

		return this._userRepository.save(user);
	}

	async update(id: number, user: User): Promise<void> {
		await this._userRepository.update(id, user);
	}

	async delete(id: number): Promise<void> {
		const userExist = await this._userRepository.findOne(id, {
			where: { active: true },
		});

		if (!userExist) {
			throw new NotFoundException();
		}
		userExist.active = false;
		userExist.save();
	}

	async setRoleToUser(userId: number, roleId: number) {
		const userExist = await this._userRepository.findOne(userId, {
			where: { active: true },
		});

		if (!userExist) {
			throw new NotFoundException();
		}

		const roleExist = await this._roleRepository.findOne(roleId, {
			where: { active: true },
		});

		if (!roleExist) {
			throw new NotFoundException('Role does not exist');
		}

		userExist.roles.push(roleExist);
		await this._userRepository.save(userExist);

		return true;
	}
}
