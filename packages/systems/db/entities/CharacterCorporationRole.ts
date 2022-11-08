import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { Character } from './Character';
import { CorporationRole } from './CorporationRole';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class CharacterCorporationRole extends TimestampEntity {
	@PrimaryColumn({ type: 'int', name: 'characterId' })
	@OneToOne(() => Character, (character) => character.corporationRole)
	@JoinColumn()
	character?: Character | number;

	@PrimaryColumn({ type: 'int', name: 'corporationRoleId' })
	@ManyToOne(() => CorporationRole, (corporationRole) => corporationRole.characterCorporationRoles)
	corporationRole!: CorporationRole | number;
}
