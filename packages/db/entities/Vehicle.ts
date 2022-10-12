import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
	model!: string;

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
	position!: Position;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@Index()
	@ManyToOne(() => Character, (character) => character.characterVehicle, { nullable: true })
	characterOwner?: number;

	@Index()
	@ManyToOne(() => Corporation, (corporation) => corporation.corporationVehicles, { nullable: true })
	corporationOwner?: number;

	@Index()
	@ManyToOne(() => Group, (group) => group.groupVehicle, { nullable: true })
	groupOwner?: number;
}
