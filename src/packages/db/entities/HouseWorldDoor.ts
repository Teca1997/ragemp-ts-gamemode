import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { House } from './House';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class HouseWorldDoor {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 50 })
	name!: string;

	@Column()
	state!: boolean;

	@Column('jsonb')
	labelPosition!: Position;

	@Column('jsonb')
	interactionColshapePosition!: Position;

	@Column('float')
	interactionColshapeRadius!: number;

	@Column('int8', { default: () => '0' })
	dimension?: number;

	@ManyToOne(() => House, (house) => house.worldDoors, { nullable: false })
	house!: number;
}
