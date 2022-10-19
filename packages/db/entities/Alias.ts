import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

import { Character } from './Character';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Alias extends TimestampEntity {
	@Index()
	@PrimaryColumn({ name: 'aliasingId', type: 'int8' })
	@ManyToOne(() => Character, (character) => character.aliasedCharacters)
	aliasing!: number;

	@Index()
	@PrimaryColumn({ name: 'aliasedId', type: 'int8' })
	@ManyToOne(() => Character, (character) => character.aliasedByCharacters)
	aliased!: number;

	@Column({ length: 50 })
	alias!: string;
}
