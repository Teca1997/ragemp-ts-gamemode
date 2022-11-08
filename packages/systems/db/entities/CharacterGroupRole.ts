import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { Character } from '../entities/Character';
import { GroupRole } from './GroupRole';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class CharacterGroupRole extends TimestampEntity {
	@PrimaryColumn({ type: 'int', name: 'characterId' })
	@OneToOne(() => Character, (character) => character.groupRole)
	@JoinColumn()
	character?: Character | number;

	@PrimaryColumn({ type: 'int', name: 'groupRoleId' })
	@ManyToOne(() => GroupRole, (groupRole) => groupRole.characterGroupRoles)
	groupRole!: GroupRole | number;
}
