import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Account } from './Account';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Ip {
	@PrimaryColumn({ type: 'varchar', length: 15 })
	ip!: string;

	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	timeAdded?: Date;

	@OneToMany(() => Account, (account) => account.accountIps, { nullable: false })
	accountIp?: string;
}
