import { Entity, ManyToOne } from 'typeorm';

import { House } from './House';
import { WorldDoor } from './WorldDoor';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class HouseWorldDoor extends WorldDoor {
	@ManyToOne(() => House, (house) => house.worldDoors, { nullable: false })
	house!: number;
}
