import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Account } from './Account';
import { AccountPunishment } from './AccountPunishment';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Punishment {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ type: 'varchar', length: 30 })
	name!: string;

	@Column('text')
	description!: string;

	@Column({ type: 'int', nullable: true })
	duration!: number | null;

	@Exclude()
	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => Account, (account) => account.accountPunishments, { nullable: false })
	accountPunishments?: number[] | AccountPunishment[];
}
