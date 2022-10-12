import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
	labelPosition!: Vector;

	@Column('jsonb')
	interactionColshapePosition!: Vector;

	@Column('float')
	interactionColshapeRadius!: number;

	@Column('int8', { default: () => '0' })
	dimension?: number;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@ManyToOne(() => House, (house) => house.worldDoors, { nullable: false })
	house!: number;
}
