import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
	markerPosition!: Position;

	@Column('double precision', { default: () => '1000000' })
	price?: number;

	@Index()
	@ManyToOne(() => Character, (character) => character.houses, { nullable: true })
	characterOwner?: number;

	@Index()
	@ManyToOne(() => Corporation, (corporation) => corporation.houses, { nullable: true })
	corporationOwner?: number;

	@Index()
	@ManyToOne(() => Group, (group) => group.houses, { nullable: true })
	groupOwner?: number;

	@Column('varchar', { length: 100 })
	street!: string;

	@Column('integer')
	houseNumber?: number;

	@Column('boolean', { name: 'locked', default: () => 'false', nullable: false })
	locked?: boolean;

	@ManyToOne(() => Interior, (interior) => interior.houses)
	interior!: number;

	@OneToMany(() => HouseWorldDoor, (houseWorldDoor) => houseWorldDoor.house)
	worldDoors?: number[];
}
