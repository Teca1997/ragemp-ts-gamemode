import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Account } from './Account';
import { Alias } from './Alias';
import { CharacterIdLog } from './CharacterIdLog';
import { CharacterPunishment } from './CharacterPunishment';
import { Corporation } from './Corporation';
import { Group } from './Group';
import { House } from './House';
import { Report } from './Report';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Character {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30 })
	firstname!: string;

	@Column({ length: 30 })
	lastname!: string;

	@Column({ type: 'jsonb' })
	appearance!: object;

	@Column({ type: 'jsonb' })
	location!: Position;

	@Column({ type: 'date' })
	dateOfBirth!: string;

	@Column({ length: 25 })
	nationality!: string;

	@Column({ type: 'text' })
	story!: string;

	@Column({ type: 'int8', default: 0 })
	timePlayed?: number;

	@Column({ type: 'jsonb' })
	inventory!: any;

	@Column({ type: 'jsonb', default: { armour: 0, health: 100, hunger: 100, thirst: 100 } })
	vitals?: any;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@Index()
	@Column({ type: 'number', name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.characters)
	account!: number;

	@OneToMany(() => Alias, (alias) => alias.aliasing, { nullable: false, eager: true })
	aliasAliasing?: Alias[];

	@OneToMany(() => Alias, (alias) => alias.aliased, { nullable: false, eager: true })
	aliasAliased?: Alias[];

	@OneToMany(() => Corporation, (corporation) => corporation.owner, { nullable: false, eager: true })
	characterCorporation?: Corporation[];

	@OneToMany(() => Group, (group) => group.owner, { nullable: false, eager: true })
	characterGroup?: Group[];

	@OneToMany(() => CharacterIdLog, (characterIdLog) => characterIdLog.character, { nullable: false, eager: true })
	characterIdLog?: CharacterIdLog[];

	@OneToMany(() => Vehicle, (vehicle) => vehicle.characterOwner, { nullable: false, eager: true })
	characterVehicle?: number[];

	@OneToMany(() => Report, (report) => report.claimedBy, { nullable: false, eager: true })
	characterClaimedBy?: number[];

	@OneToMany(() => Report, (aliased) => aliased.reportedBy, { nullable: false, eager: true })
	characterReportedBy?: number[];

	@OneToMany(() => House, (house) => house.characterOwner, { nullable: false, eager: true })
	houses?: House[];

	@OneToMany(() => CharacterPunishment, (characterPunishment) => characterPunishment.characterRecievedPunishment, { nullable: false, eager: true })
	characterPunishments?: CharacterPunishment[];

	@OneToMany(() => CharacterPunishment, (characterPunishment) => characterPunishment.characterIssuedPunishment, { nullable: false, eager: true })
	characterIssuedPunishments?: CharacterPunishment[];
}
