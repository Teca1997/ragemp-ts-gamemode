import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { House } from './House';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Interior {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 25, nullable: true })
	ipl?: string;

	@Column('jsonb')
	interiorLocation!: Position;

	@Column({ length: 50 })
	name!: string;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => House, (house) => house.interior)
	houses?: number[];
}
