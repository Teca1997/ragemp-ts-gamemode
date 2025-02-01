import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Ip extends TimestampEntity {
	@PrimaryColumn({ type: 'varchar', length: 15 })
	ip!: string;

	@OneToMany(() => Account, (account) => account.accountIps, { nullable: false })
	accountIp?: string;
}
