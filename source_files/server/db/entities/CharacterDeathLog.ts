import {
	Column,
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
export class CharacterDeathLog {
	@PrimaryColumn({ type: 'int4', name: 'victimId' })
	@ManyToOne(() => Character, (character) => character.characterVictim)
	victim!: Character | number;

	@ManyToOne(() => Character, (character) => character.characterKiller, { nullable: true })
	killer: Character | number | null;

	@Column({ type: 'int8' })
	reason!: number;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	constructor(victim: Character | number, killer: Character | number | null, reason: number) {
		this.victim = victim;
		this.killer = killer;
		this.reason = reason;
	}
}
