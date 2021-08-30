import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '../../entity/role.entity';

@Controller('api/roles')
export class RoleController {
	constructor(private readonly _roleService: RoleService) {}

	//TODO: Add guard and pipes
	@Get(':id')
	async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
		return this._roleService.get(id);
	}

	//TODO: Add guard and pipes
	@Get()
	async getRoles(): Promise<Role[]> {
		return this._roleService.getAll();
	}

	//TODO: Add guard and pipes
	@Post()
	async createRole(@Body() role: Role): Promise<Role> {
		return this._roleService.create(role);
	}

	//TODO: Add guard and pipes
	@Patch(':id')
	async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Role) {
		await this._roleService.update(id, role);
		return true;
	}

	@Delete(':id')
	async deleteRole(@Param('id', ParseIntPipe) id: number) {
		await this._roleService.delete(id);
		return true;
	}
}
