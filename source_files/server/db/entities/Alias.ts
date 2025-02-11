import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Character } from './Character';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Alias {
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

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
