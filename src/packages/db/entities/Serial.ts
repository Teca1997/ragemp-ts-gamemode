import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Account } from './Account';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Serial {
	@PrimaryColumn({ type: 'char', length: 128 })
	serial!: string;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	timeAdded?: Date;

	@OneToMany(() => Account, (account) => account.accountSerials, { nullable: false })
	accountSerial?: string[];
}
