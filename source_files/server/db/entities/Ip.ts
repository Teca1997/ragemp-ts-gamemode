import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { AccountIp } from './AccountIp';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Ip {
	@PrimaryColumn({ type: 'varchar', length: 15 })
	id!: string;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => AccountIp, (accountIp) => accountIp.ip)
	accountIps: AccountIp[] | number[];

	constructor(id: string) {
		this.id = id;
	}
}
