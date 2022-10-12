import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Account } from './Account';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Serial {
	@PrimaryColumn({ type: 'char', length: 128 })
	serial!: string;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	timeAdded?: Date;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => Account, (account) => account.accountSerials, { nullable: false })
	accountSerial?: string[];
}
