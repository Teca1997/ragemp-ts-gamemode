import { Vector } from '@shared';
import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
export class WorldDoor {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 50 })
	name!: string;

	@Column()
	state!: boolean;

	@Column('jsonb')
	labelPosition!: Vector;

	@Column('jsonb')
	interactionColshapePosition!: Vector;

	@Column('float')
	interactionColshapeRadius!: number;

	@Column('int8', { default: () => '0' })
	dimension?: number;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
