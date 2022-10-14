import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Character } from './Character';
import { Corporation } from './Corporation';
import { Group } from './Group';
import { HouseWorldDoor } from './HouseWorldDoor';
import { Interior } from './Interior';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Index(['houseNumber', 'street'], { unique: true })
export class House {
	@PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
	id?: number;

	@Column('jsonb')
	markerPosition!: Vector;

	@Column('double precision', { default: () => '1000000' })
	price?: number;

	@Index()
	@ManyToOne(() => Character, (character) => character.houses, { nullable: true })
	characterOwner?: number;

	@Index()
	@ManyToOne(() => Corporation, (corporation) => corporation.corporationHouses, { nullable: true })
	corporationOwner?: number;

	@Index()
	@ManyToOne(() => Group, (group) => group.groupHouses, { nullable: true })
	groupOwner?: number;

	@Column('varchar', { length: 100 })
	street!: string;

	@Column('integer')
	houseNumber?: number;

	@Column('boolean', { name: 'locked', default: () => 'false', nullable: false })
	locked?: boolean;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@ManyToOne(() => Interior, (interior) => interior.houses)
	interior!: number;

	@OneToMany(() => HouseWorldDoor, (houseWorldDoor) => houseWorldDoor.house)
	worldDoors?: number[];
}
