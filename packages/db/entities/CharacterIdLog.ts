import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
