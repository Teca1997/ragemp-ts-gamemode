import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import moment from 'moment';
import { Account } from './Account';
import { Punishment } from './Punishment';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class AccountPunishment {
	@PrimaryColumn({ type: 'int8', name: 'punishmentId' })
	@ManyToOne(() => Punishment, (punishment) => punishment.accountPunishments)
	punishment!: Punishment;

	@PrimaryColumn({ type: 'int8' })
	receivedId: number;

	@PrimaryColumn({ type: 'int8' })
	issuedId: number;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@ManyToOne(() => Account, (account) => account.accountPunishments, {
		nullable: false,
		eager: false
	})
	received!: Account | number;

	@ManyToOne(() => Account, (account) => account.accountIssuedPunishments, {
		nullable: true,
		eager: false
	})
	issued?: number | Account;

	@Column({ type: 'timestamptz' })
	expires?: Date;

	@BeforeInsert()
	beforeinsert() {
		this.expires = moment().add(this.punishment.duration, 'hours').toDate();
	}
}
