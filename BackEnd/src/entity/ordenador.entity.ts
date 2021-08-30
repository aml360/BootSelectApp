import { IComputer } from 'sharedInterfaces/Entities';
import {
	BaseEntity,
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm';
import { Classroom } from './clase.entity';
import { Disk } from './disco.entity';

@Entity('ordenador')
export class Computer extends BaseEntity implements IComputer {
	@PrimaryColumn({ type: 'varchar', unique: true, length: 10 })
	id: string;

	@Column({ type: 'varchar', length: 20, nullable: false })
	ip: string;

	@ManyToOne(() => Classroom, clase => clase.ordenadores)
	clase?: Classroom;

	@OneToMany(() => Disk, disco => disco.ordenador)
	discos?: Disk[];

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;
}
