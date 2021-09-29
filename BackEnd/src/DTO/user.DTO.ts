import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IAdminAddDTO } from 'sharedInterfaces/DTO';

export class AdminAddDTO implements IAdminAddDTO {
	@ApiProperty()
	@Expose()
	@IsString()
	username: string;

	@ApiProperty()
	@Expose()
	@IsString()
	password: string;

	@ApiProperty()
	@Expose()
	@IsEmail({}, { message: '' })
	email: string;

	@ApiProperty()
	@Expose()
	@IsString()
	name: string;

	@ApiProperty()
	@Expose()
	@IsString()
	lastname: string;
}
