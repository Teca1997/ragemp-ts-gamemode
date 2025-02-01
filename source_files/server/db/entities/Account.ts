import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AccountPunishment } from './AccountPunishment';
import { AccountSerial } from './AccountSerial';
import { AccountSocialClub } from './AccountSocialClub';
import { Character } from './Character';
import { Report } from './Report';
import { Role } from './Role';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Account extends TimestampEntity {
	@Index()
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30, unique: true })
	username!: string;

	@Column({ length: 50, unique: true })
	email!: string;

	@Column({ type: 'char', length: 60 })
	password!: string;

	@Column({ type: 'char', length: 60 })
	salt!: string;

	@Column({ type: 'timestamptz', nullable: true })
	dateActivated?: Date;

	@Column({ type: 'timestamptz', nullable: true })
	lastLogin?: Date;

	@Column({ type: 'int', name: 'roleId' })
	@ManyToOne(() => Role, (role) => role.accounts, { nullable: false })
	role!: number | Role;

	@OneToMany(() => Character, (character) => character.account, { eager: true })
	characters?: number[];

	@OneToMany(() => AccountPunishment, (accountPunishment) => accountPunishment.received, { eager: true })
	accountPunishments?: AccountPunishment[] | number[];

	@OneToMany(() => AccountPunishment, (accountPunishment) => accountPunishment.issued, { eager: true })
	accountIssuedPunishments?: AccountPunishment[] | number[];

	@OneToMany(() => AccountSerial, (accountSerial) => accountSerial.serial, { eager: true })
	accountSerials?: AccountSerial[] | number[];

	@OneToMany(() => AccountSocialClub, (accountSocialClub) => accountSocialClub.socialClub, { eager: true })
	accountSocialClubs?: AccountSocialClub[] | number[];

	@OneToMany(() => Report, (report) => report.claimedBy, { eager: true })
	accountClaimedBy?: Report[] | number[];

	@OneToMany(() => Report, (report) => report.reportedBy, { eager: true })
	accountReportedBy?: Report[] | number[];
}
