import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Character } from './Character';
import { House } from './House';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Group {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 50 })
	name!: string;

	@Index()
	@ManyToOne(() => Character, (character) => character.characterGroup, { nullable: true })
	owner?: number;

	@OneToMany(() => Vehicle, (vehicle) => vehicle.groupOwner)
	groupVehicle?: number[];

	@OneToMany(() => House, (house) => house.groupOwner)
	houses?: number[];
}
