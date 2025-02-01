import { BeforeInsert, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { default_female_clothes, default_male_clothes } from '../../../shared/defaultChacterClothes';

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
	firstname!: string;

	@Column({ length: 30 })
	lastname!: string;

	@Column({ type: 'jsonb' })
	colors!: CharacterColors;

	@Column({ type: 'int' })
	gender!: number;

	@Column({ type: 'jsonb', nullable: false })
	parents!: CharacterParents;

	@Column('int', { array: true })
	faceFeatures!: number[];

	@Column({ type: 'jsonb' })
	headOverlay!: CharacterHeadOverlay[];

	@Column({ type: 'jsonb' })
	clothes?: CharacterClothingItem[];

	@Column({ type: 'jsonb' })
	hair!: CharacterHair;

	@Column({ type: 'jsonb' })
	position!: Position;

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
	vitals?: CharacterVitals;

	@Index()
	@Column({ type: 'number', name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.characters)
	account!: Account | number;

	@OneToMany(() => Alias, (alias) => alias.aliasing, { nullable: false, eager: true })
	aliasedCharacters?: Alias[];

	@OneToMany(() => Alias, (alias) => alias.aliased, { nullable: false, eager: true })
	aliasedByCharacters?: Alias[];

	@OneToMany(() => CharacterIdLog, (characterIdLog) => characterIdLog.character, { nullable: false, eager: true })
	characterIdLog?: CharacterIdLog[];

	@OneToMany(() => Vehicle, (vehicle) => vehicle.characterOwner, { nullable: false, eager: true })
	characterVehicle?: Vehicle[];

	@OneToMany(() => CharacterDeathLog, (characterDeathLog) => characterDeathLog.victim)
	characterVictim?: CharacterDeathLog | number;

	@OneToMany(() => CharacterDeathLog, (characterDeathLog) => characterDeathLog.killer)
	characterKiller?: CharacterDeathLog | number;

	//event listners
	@BeforeInsert()
	setDefaultCLothes?(): void {
		if (this.gender == 1) {
			this.clothes = default_male_clothes;
		} else {
			this.clothes = default_female_clothes;
		}
	}
}
