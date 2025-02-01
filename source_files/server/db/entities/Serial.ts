import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Serial extends TimestampEntity {
	@PrimaryColumn({ type: 'char', length: 128 })
	serial!: string;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	timeAdded?: Date;

	@OneToMany(() => Account, (account) => account.accountSerials, { nullable: false })
	accountSerial?: string[];
}
