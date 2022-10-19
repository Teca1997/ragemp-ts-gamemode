import { Column, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Character } from './Character';
import { Corporation } from './Corporation';
import { Group } from './Group';
import { TimestampEntity } from './TimestampEntity';

export class Property extends TimestampEntity {
	@PrimaryGeneratedColumn({ type: 'int8', name: 'id' })
	id?: number;

	@Column('jsonb')
	markerPosition!: Vector;

	@Column('double precision', { default: () => '1000000' })
	price?: number;

	@Column('boolean', { name: 'locked', default: () => 'false', nullable: false })
	locked?: boolean;

	@Index()
	@ManyToOne(() => Character, (character) => character.houses, { nullable: true })
	characterOwner?: number;

	@Index()
	@ManyToOne(() => Corporation, (corporation) => corporation.corporationHouses, { nullable: true })
	corporationOwner?: number;

	@Index()
	@ManyToOne(() => Group, (group) => group.groupHouses, { nullable: true })
	groupOwner?: number;
}
