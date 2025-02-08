import { Vector } from '@shared';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './TimestampEntity';
export class WorldDoor extends TimestampEntity {
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
}
