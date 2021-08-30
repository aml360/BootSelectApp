import { IUser } from 'sharedInterfaces/Entities';
import { SignupDTO } from 'src/DTO';
import {
	BaseEntity,
	Entity,
	Column,
	JoinTable,
	ManyToMany,
	UpdateDateColumn,
	CreateDateColumn,
	PrimaryColumn,
} from 'typeorm';
import { Role, Classroom } from '.';

@Entity('user')
export class User extends BaseEntity implements IUser {
	@PrimaryColumn({ type: 'varchar', unique: true, length: 40, nullable: false })
	username: string;

	@Column({ type: 'varchar', nullable: false })
	password: string;

	@Column({ type: 'varchar', nullable: true })
	email?: string;

	@Column({ type: 'varchar', nullable: true })
	name: string;

	@Column({ type: 'varchar', nullable: false })
	lastname: string;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
	updatedAt: Date;

	@ManyToMany(() => Role, role => role.users, { eager: true })
	@JoinTable({ name: 'user_roles' })
	roles: Role[];

	@ManyToMany(() => Classroom, clase => clase.profesores)
	clases: Classroom[];

	@Column({ type: 'boolean', default: false })
	active: boolean;

	/**
	 * This function creates a new user instance for save the user to database, use only for register
	 * @param usr User from signupDto, must ve valid
	 */
	public static buildFromRegister(usr: SignupDTO): User {
		let user = new User();
		user.username = usr.username;
		user.password = usr.password;
		user.name = usr.name;
		user.lastname = usr.surnames;
		user.email = usr.email;
		return user;
	}
}
