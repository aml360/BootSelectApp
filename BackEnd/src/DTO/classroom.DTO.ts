import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { IClassroomGetDTO, IClassroomInfoGetDTO, IComputerGetDTO } from 'sharedInterfaces/DTO';
import { User } from 'src/entity';

export class ClassroomGetDTO implements IClassroomGetDTO {
	@ApiProperty()
	@Expose()
	@IsString()
	id: string;

	@ApiProperty()
	@Expose()
	@IsString()
	name: string;

	@ApiProperty()
	@Expose()
	description: string;

	@ApiProperty()
	@Expose()
	profesores: User['username'][];

	@ApiProperty()
	@Expose()
	@Type(() => Date)
	createdAt: Date;

	@ApiProperty()
	@Expose()
	@Type(() => Date)
	updatedAt: Date;
}

export class ClassroomInfoGetDTO implements IClassroomInfoGetDTO {
	@ApiProperty()
	@Expose()
	@IsString()
	id: string;

	@ApiProperty()
	@Expose()
	@IsString()
	name: string;

	@ApiProperty()
	@Expose()
	@IsString()
	description: string;

	@ApiProperty()
	@Expose()
	@IsString()
	profesores: User['username'][];

	// TODO: Complete DTO, create ComputerGetDTO class
	@ApiProperty()
	@Expose()
	ordenadores: IComputerGetDTO[];

	@ApiProperty()
	@Expose()
	@Type(() => Date)
	@IsDate()
	createdAt: Date;

	@ApiProperty()
	@Expose()
	@Type(() => Date)
	@IsDate()
	updatedAt: Date;
}
