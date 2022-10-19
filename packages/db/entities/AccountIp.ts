import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { Ip } from './Ip';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class AccountIp extends TimestampEntity {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.accountIps, { nullable: false })
	account!: number;

	@ManyToOne(() => Ip, (ip) => ip.accountIp, { nullable: false })
	@PrimaryColumn({ type: 'varchar', length: 15, name: 'ipIp' })
	@JoinColumn()
	ip!: string;
}
