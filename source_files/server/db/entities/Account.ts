import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { AccountPunishment } from './AccountPunishment';
import { Character } from './Character';
import { Report } from './Report';
import { Role } from './Role';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Account {
	@Index()
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30, unique: true, nullable: false })
	username!: string;

	@Column({ length: 50, unique: true, nullable: false })
	email!: string;

	@Exclude()
	@Column({ type: 'char', length: 128, nullable: false })
	password!: string;

	@Exclude()
	@Column({ type: 'char', length: 64, nullable: false })
	salt!: string;

	@Column({ type: 'timestamptz', nullable: true })
	dateActivated?: Date;

	@Column({ type: 'timestamptz', nullable: true })
	lastLogin?: Date;

	@Column({ type: 'int', name: 'roleId' })
	@ManyToOne(() => Role, (role) => role.accounts, { nullable: false, eager: true })
	role!: number | Role;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => Character, (character) => character.account, { eager: true })
	characters?: Character[];

	@OneToMany(() => AccountPunishment, (accountPunishment) => accountPunishment.received, {
		eager: true
	})
	accountPunishments?: AccountPunishment[] | number[];

	@Exclude()
	@OneToMany(() => AccountPunishment, (accountPunishment) => accountPunishment.issued, {
		eager: true
	})
	accountIssuedPunishments?: AccountPunishment[] | number[];

	@Exclude()
	@OneToMany(() => Report, (report) => report.claimedBy, { eager: true })
	accountClaimedBy?: Report[] | number[];

	@Exclude()
	@OneToMany(() => Report, (report) => report.reportedBy, { eager: true })
	accountReportedBy?: Report[] | number[];

	constructor(
		username: string,
		email: string,
		password: string,
		salt: string,
		role: Role | number = 1
	) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.salt = salt;
		this.role = role;
	}
}
