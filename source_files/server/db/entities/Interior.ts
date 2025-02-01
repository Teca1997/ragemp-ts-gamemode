import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { House } from './House';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Interior extends TimestampEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 25, nullable: true })
	ipl?: string;

	@Column('jsonb')
	interiorLocation!: Vector;

	@Column({ length: 50 })
	name!: string;

	@OneToMany(() => House, (house) => house.interior)
	houses?: number[];
}
