import { IDisk } from 'sharedInterfaces/Entities';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Computer } from './ordenador.entity';

@Entity('disco')
export class Disk extends BaseEntity implements IDisk {
	@PrimaryGeneratedColumn({ type: 'int8' })
	dbId: number;

	@Column({ type: 'int8' })
	id: number;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@ManyToOne(() => Computer, pc => pc.discos)
	ordenador?: Computer;

	@Column({ nullable: false })
	bootUp: Date;
	//Aunque sería mas correcto guardarlo como type: 'time' es luego mas complicado manejar esto como Date
	@Column({ nullable: false })
	shutdown: Date;
}
