import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { Serial } from './Serial';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class AccountSerial extends TimestampEntity {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.id, { eager: false })
	account!: number | Account;

	@PrimaryColumn('varchar', { length: 128, name: 'serialId' })
	@ManyToOne(() => Serial, (serial) => serial.id, { nullable: false })
	serial!: string;
}
