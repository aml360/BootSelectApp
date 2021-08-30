import { IClassroom } from 'sharedInterfaces/Entities';
import {
	BaseEntity,
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Computer } from './ordenador.entity';
import { User } from './user.entity';

@Entity('clase')
export class Classroom extends BaseEntity implements IClassroom {
	@PrimaryColumn({ type: 'varchar', length: 10 })
	id: string;

	@Column({ type: 'varchar', length: 20, nullable: false })
	name: string;

	@Column({ type: 'text', nullable: false })
	description: string;

	@OneToMany(() => Computer, pc => pc.clase)
	ordenadores: Computer[];

	@ManyToMany(() => User, usr => usr.clases, { eager: true })
	@JoinTable()
	profesores: User[];

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;
}
