import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CharacterGroupRole } from './CharacterGroupRole';
import { Group } from './Group';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Unique('unique_group_role_name', ['name', 'group'])
export class GroupRole extends TimestampEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@ManyToOne(() => Group, (group) => group.groupRoles)
	group!: Group | number;

	@Column({ type: 'varchar', length: 50 })
	name!: string;

	@Column({ type: 'int', nullable: true })
	roleLevel?: number;

	@OneToMany(() => CharacterGroupRole, (characterGroupRoles) => characterGroupRoles.character)
	characterGroupRoles?: CharacterGroupRole[];
}
