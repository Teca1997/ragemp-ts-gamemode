import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

	@OneToMany(() => Account, (account) => account.role)
	accounts?: Account[] | null;
}
