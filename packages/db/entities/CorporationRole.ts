import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { Character } from './Character';
import { Corporation } from './Corporation';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Unique('unique_corporation_role_name', ['name', 'corporation'])
export class CorporationRole {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@ManyToOne(() => Corporation, (corporation) => corporation.corporationRoles)
	corporation!: Corporation | number;

	@Column({ type: 'varchar', length: 50 })
	name!: string;

	@Column({ type: 'int', nullable: true })
	roleLevel?: number;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => Character, (character) => character.corporationRole)
	characters?: Character[];
}
