import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { AccountSerial } from './AccountSerial';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Serial {
	@PrimaryColumn({ type: 'varchar', length: 128 })
	id!: string;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => AccountSerial, (accountSerial) => accountSerial.serial)
	accountSerials?: AccountSerial[] | number[];

	constructor(id: string) {
		this.id = id;
	}
}
