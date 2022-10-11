import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

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
}
