import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CharacterCorporationRole } from './CharacterCorporationRole';
import { Corporation } from './Corporation';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Unique('unique_corporation_role_name', ['name', 'corporation'])
export class CorporationRole extends TimestampEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@ManyToOne(() => Corporation, (corporation) => corporation.corporationRoles)
	corporation!: Corporation | number;

	@Column({ type: 'varchar', length: 50 })
	name!: string;

	@Column({ type: 'int', nullable: true })
	roleLevel?: number;

	@OneToMany(() => CharacterCorporationRole, (characterCorporationRole) => characterCorporationRole.character)
	characterCorporationRoles?: CharacterCorporationRole[];
}
