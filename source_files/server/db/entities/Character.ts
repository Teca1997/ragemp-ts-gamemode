import {
	CharacterClothingItem,
	CharacterColors,
	CharacterHair,
	CharacterHeadOverlay,
	CharacterParents,
	CharacterVitals,
	Position
} from '@shared';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from './Account';
import { Alias } from './Alias';
import { CharacterDeathLog } from './CharacterDeathLog';
import { CharacterIdLog } from './CharacterIdLog';
import { TimestampEntity } from './TimestampEntity';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Character extends TimestampEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30 })
	firstName!: string;

	@Column({ length: 30 })
	lastName!: string;

	@Column({ type: 'jsonb' })
	colors!: CharacterColors;

	@Column({ type: 'int' })
	gender!: number;

	@Column({ type: 'jsonb', nullable: false })
	parents!: CharacterParents;

	@Column('int', { array: true })
	faceFeatures!: number[];

	@Column({ type: 'jsonb' })
	headOverlays!: CharacterHeadOverlay[];

	@Column({ type: 'jsonb' })
	clothes!: CharacterClothingItem[];

	@Column({ type: 'jsonb' })
	hairColors!: CharacterHair;

	@Column({ type: 'jsonb' })
	position!: Position;

	/* @Column({ type: 'date' })
	dateOfBirth!: string;

	@Column({ length: 25 })
	nationality!: string;

	@Column({ type: 'text' })
	story!: string; */

	@Column({ type: 'int8', default: 0 })
	timePlayed?: number = 0;

	@Column({ type: 'jsonb' })
	inventory!: any;

	@Column({ type: 'jsonb', default: { armour: 0, health: 100, hunger: 100, thirst: 100 } })
	vitals?: CharacterVitals = { armour: 0, health: 100, hunger: 100, thirst: 100 };

	@Index()
	@Column({ type: 'number', name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.characters, { nullable: true, eager: false })
	account!: Account | number;

	@OneToMany(() => Alias, (alias) => alias.aliasing, { nullable: false, eager: true })
	aliasedCharacters?: Alias[];

	@OneToMany(() => Alias, (alias) => alias.aliased, { nullable: false, eager: true })
	aliasedByCharacters?: Alias[];

	@OneToMany(() => CharacterIdLog, (characterIdLog) => characterIdLog.character, {
		nullable: false,
		eager: false
	})
	characterIdLog?: CharacterIdLog[];

	@OneToMany(() => Vehicle, (vehicle) => vehicle.characterOwner, {
		nullable: false,
		eager: true
	})
	characterVehicle?: Vehicle[];

	@OneToMany(() => CharacterDeathLog, (characterDeathLog) => characterDeathLog.victim)
	characterVictim?: CharacterDeathLog | number;

	@OneToMany(() => CharacterDeathLog, (characterDeathLog) => characterDeathLog.killer)
	characterKiller?: CharacterDeathLog | number;
}
