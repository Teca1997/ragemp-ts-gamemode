import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AccountIp } from './AccountIp';
import { AccountSerial } from './AccountSerial';
import { AccountSocialId } from './AccountSocialId';
import { Character } from './Character';
import { Role } from './Role';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Account {
	@Index()
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30, unique: true })
	username!: string;

	@Column({ length: 50, unique: true })
	email!: string;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	dateCreated?: Date;

	@Column({ nullable: true })
	dateActivated?: Date;

	@Column({ nullable: true })
	lastLogin?: Date;

	@Column({ type: 'char', length: 60 })
	password!: string;

	@Index()
	@Column({ type: 'number', name: 'roleId' })
	@ManyToOne(() => Role, (role) => role.accounts, { nullable: false })
	role!: number;

	@OneToMany(() => Character, (character) => character.account, { eager: true })
	characters?: Character[];

	@OneToMany(() => AccountIp, (ip) => ip.account, { eager: true })
	accountIps?: AccountIp[];

	@OneToMany(() => AccountSerial, (serial) => serial.account, { eager: true })
	accountSerials?: AccountSerial[];

	@OneToMany(() => AccountSocialId, (socialId) => socialId.account, { eager: true })
	accountSocialIds?: AccountSocialId[];
}
