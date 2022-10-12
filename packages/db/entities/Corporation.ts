import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Character } from './Character';
import { House } from './House';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Corporation {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 50 })
	name!: string;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@Index()
	@ManyToOne(() => Character, (character) => character.characterCorporation, { nullable: true })
	owner?: number;

	@OneToMany(() => Vehicle, (vehicle) => vehicle.corporationOwner)
	corporationVehicle?: number[];

	@OneToMany(() => House, (house) => house.corporationOwner)
	houses?: number[];
}
