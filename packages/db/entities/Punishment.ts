import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Character } from './Character';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Punishment {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column('text')
	description!: string;

	@Column('interval', { nullable: true })
	duration!: string;

	@OneToMany(() => Character, (character) => character.characterIssuedPunishments, { nullable: false })
	characterPunishments?: number[];

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
