import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AccountIp } from './AccountIp';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Ip extends TimestampEntity {
	@PrimaryColumn({ type: 'varchar', length: 15 })
	id!: string;

	@OneToMany(() => AccountIp, (accountIp) => accountIp.ip)
	accountIps: AccountIp[] | number[];

	constructor(id: string) {
		super();
		this.id = id;
	}
}
