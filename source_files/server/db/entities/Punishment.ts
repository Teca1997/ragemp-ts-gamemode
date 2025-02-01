import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from './Account';
import { AccountPunishment } from './AccountPunishment';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Punishment extends TimestampEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column('text')
	description!: string;

	@Column({ type: 'int', nullable: true })
	duration!: number | null;

	@OneToMany(() => Account, (account) => account.accountPunishments, { nullable: false })
	accountPunishments?: number[] | AccountPunishment[];
}
