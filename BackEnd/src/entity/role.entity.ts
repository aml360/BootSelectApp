import { IRole, Roles, RoleStatus } from 'sharedInterfaces/Entities';
import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role extends BaseEntity implements IRole {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'varchar', length: 20, nullable: false })
	name: Roles;

	@Column({ type: 'text', nullable: false })
	description: string;

	@ManyToMany(() => User, user => user.roles)
	users?: User[];

	@Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
	status: RoleStatus;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;
}
