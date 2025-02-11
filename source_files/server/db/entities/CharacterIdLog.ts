import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Character } from './Character';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class CharacterIdLog {
	@PrimaryColumn({ type: 'int8', name: 'characterId' })
	@ManyToOne(() => Character, (character) => character.characterIdLog)
	character!: number;

	@PrimaryColumn({ default: () => 'CURRENT_TIMESTAMP' })
	timeAssigned!: Date;

	@PrimaryColumn({ type: 'int8' })
	assignedId!: number;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
