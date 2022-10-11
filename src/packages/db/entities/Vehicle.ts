import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Character } from './Character';
import { Corporation } from './Corporation';
import { Group } from './Group';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Vehicle {
	@Index()
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ type: 'float4', default: null })
	price?: number;

	@Column({ length: 8, nullable: true })
	plate?: string;

	@Column({ length: 30, nullable: false })
	modelHash!: string;

	@Column({ nullable: false, default: false })
	doorState?: boolean;

	@Column({ type: 'float4', nullable: false, default: '200' })
	engineHealth?: number;

	@Column({ type: 'float4', nullable: false, default: '0' })
	distanceDriven?: number;

	@Column({ type: 'float4', nullable: false, default: '100' })
	tank?: number;

	@Column({ type: 'jsonb', nullable: true })
	mods?: VehicleMod[];

	@Column({ type: 'jsonb', nullable: true })
	location!: VehiclePosition;

	@Index()
	@ManyToOne(() => Character, (character) => character.characterVehicle, { nullable: true })
	characterOwner?: number;

	@Index()
	@ManyToOne(() => Corporation, (corporation) => corporation.corporationVehicle, { nullable: true })
	corporationOwner?: number;

	@Index()
	@ManyToOne(() => Group, (group) => group.groupVehicle, { nullable: true })
	groupOwner?: number;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;
}
