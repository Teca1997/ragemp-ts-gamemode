import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Character } from './Character';
import { Punishment } from './Punishment';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class CharacterPunishment {
	@PrimaryColumn({ type: 'int8', name: 'punishmentId' })
	@ManyToOne(() => Punishment, (punishment) => punishment.characterPunishments)
	punishment!: number;

	@PrimaryColumn({ type: 'int8', name: 'characterRecievedPunishmentId' })
	@ManyToOne(() => Character, (character) => character.characterPunishments)
	characterRecievedPunishment!: number;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@ManyToOne(() => Character, (character) => character.characterIssuedPunishments, { nullable: true })
	characterIssuedPunishment?: number;
}
