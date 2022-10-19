import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { HouseWorldDoor } from './HouseWorldDoor';
import { Interior } from './Interior';
import { Property } from './Property';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Index(['houseNumber', 'street'], { unique: true })
export class House extends Property {
	@Column('varchar', { length: 100 })
	street!: string;

	@Column('integer')
	houseNumber?: number;

	@ManyToOne(() => Interior, (interior) => interior.houses)
	interior!: number;

	@OneToMany(() => HouseWorldDoor, (houseWorldDoor) => houseWorldDoor.house)
	worldDoors?: number[];
}
