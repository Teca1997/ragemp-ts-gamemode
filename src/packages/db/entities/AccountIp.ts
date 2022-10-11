import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { Ip } from './Ip';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class AccountIp {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.accountIps, { nullable: false })
	account!: number;

	@PrimaryColumn({ type: 'varchar', length: 15, name: 'ipIp' })
	@ManyToOne(() => Ip, (ip) => ip.accountIp, { nullable: false })
	ip!: string;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	loginTimestamp?: Date;
}
