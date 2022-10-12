import { DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Character } from './Character';
import { Punishment } from './Punishment';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class CharacterPunishment {
	@PrimaryColumn({ type: 'int8', name: 'punishmentId' })
	@ManyToOne(() => Punishment, (punishment) => punishment.characterPunishments, { nullable: false })
	punishment!: number;

	@PrimaryColumn({ type: 'int8', name: 'characterRecievedPunishmentId' })
	@ManyToOne(() => Character, (character) => character.characterPunishments, { nullable: false })
	characterRecievedPunishment!: number;

	@ManyToOne(() => Character, (character) => character.characterIssuedPunishments, { nullable: true })
	characterIssuedPunishment?: number;

	@PrimaryColumn({ type: 'timestamptz', name: 'dateCreated', default: () => 'CURRENT_TIMESTAMP' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
