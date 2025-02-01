import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from './TimestampEntity';

export class Organization extends TimestampEntity {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 50 })
	name!: string;
}
