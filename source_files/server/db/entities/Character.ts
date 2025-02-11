import {
	CharacterClothingItem,
	CharacterHair,
	CharacterHeadOverlay,
	CharacterParents,
	CharacterVitals,
	Position
} from '@shared';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Account } from './Account';
import { Alias } from './Alias';
import { CharacterDeathLog } from './CharacterDeathLog';
import { CharacterIdLog } from './CharacterIdLog';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Character {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30 })
	firstName!: string;

	@Column({ length: 30 })
	lastName!: string;

	@Column({ type: 'int' })
	eyeColor!: number;

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

	@Column({ type: 'int8', default: 0 })
	timePlayed?: number = 0;

	@Column({ type: 'jsonb' })
	inventory!: any;

	@Column({ type: 'jsonb', default: { armour: 0, health: 100, hunger: 100, thirst: 100 } })
	vitals?: CharacterVitals = { armour: 0, health: 100, hunger: 100, thirst: 100 };

	@Exclude()
	@Index()
	@Column({ type: 'number', name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.characters, { nullable: true, eager: false })
	account?: Account | number | null;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => Alias, (alias) => alias.aliasing, { nullable: false, eager: true })
	aliasedCharacters?: Alias[];

	@Exclude()
	@OneToMany(() => Alias, (alias) => alias.aliased, { nullable: false, eager: true })
	aliasedByCharacters?: Alias[];

	@Exclude()
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

	@Exclude()
	@OneToMany(() => CharacterDeathLog, (characterDeathLog) => characterDeathLog.victim)
	characterVictim?: CharacterDeathLog | number;

	@Exclude()
	@OneToMany(() => CharacterDeathLog, (characterDeathLog) => characterDeathLog.killer)
	characterKiller?: CharacterDeathLog | number;
}
