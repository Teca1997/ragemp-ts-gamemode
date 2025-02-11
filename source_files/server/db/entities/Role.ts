import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Account } from './Account';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Role {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 25 })
	name!: string;

	@Column({ length: 255 })
	description!: string;

	@Column({ length: 8 })
	color!: string;

	@Exclude()
	@OneToMany(() => Account, (account) => account.role)
	accounts?: Account[] | number[] | null;

	@Exclude()
	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	constructor(name: string, description: string, color: string) {
		this.name = name;
		this.description = description;
		this.color = color;
	}
}
