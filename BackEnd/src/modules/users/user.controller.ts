import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/entity';

@Controller('api/users')
export class UserController {
	constructor(private readonly _userService: UserService) {}

	@Get(':username')
	async getUserUsername(@Param('username') username: string): Promise<User> {
		return this._userService.getFromUsername(username);
	}
	// @UseGuards(AuthGuard())
	// @Get()
	// async getUsers(): Promise<User[]> {
	// 	const users = await this._userService.getAll();
	// 	return users;
	// }

	@Post()
	async createUser(@Body() user: User): Promise<User> {
		return this._userService.create(user);
	}

	@Patch(':id')
	async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<true> {
		await this._userService.update(id, user);
		return true;
	}

	@UseGuards(AuthGuard)
	@Delete(':id')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		await this._userService.delete(id);
		return true;
	}

	@Post('setRole/:userId/:roleId')
	async setRoleToUser(@Param('userId', ParseIntPipe) userId: number, @Param('roleId', ParseIntPipe) roleId: number) {
		return this._userService.setRoleToUser(userId, roleId);
	}
}
