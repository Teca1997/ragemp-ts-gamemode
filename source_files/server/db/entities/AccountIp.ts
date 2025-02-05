import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { Ip } from './Ip';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class AccountIp extends TimestampEntity {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.id, { nullable: false, eager: false })
	account!: number | Account;

	@PrimaryColumn('varchar', { length: 15, name: 'ipId' })
	@ManyToOne(() => Ip, (ip) => ip.id, { nullable: false })
	ip!: string;
}
