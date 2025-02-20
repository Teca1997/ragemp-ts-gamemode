import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { Position, VehicleMod } from '@shared';
import { Exclude } from 'class-transformer';
import { randomBytes } from 'crypto';
import { Character } from './Character';

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

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@Index()
	@ManyToOne(() => Character, (character) => character.characterVehicle, { nullable: true })
	characterOwner?: number;

	@BeforeInsert()
	beforeInsert?() {
		this.plate = 'LS' + randomBytes(6 / 2).toString('hex');
	}
}
