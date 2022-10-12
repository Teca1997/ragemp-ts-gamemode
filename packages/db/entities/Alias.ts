import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Character } from './Character';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Alias {
	@Index()
	@PrimaryColumn({ name: 'aliasingId', type: 'int8' })
	@ManyToOne(() => Character, (character) => character.aliasAliasing)
	aliasing!: number;

	@Index()
	@PrimaryColumn({ name: 'aliasedId', type: 'int8' })
	@ManyToOne(() => Character, (character) => character.aliasAliased)
	aliased!: number;

	@Column({ length: 50 })
	alias!: string;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
