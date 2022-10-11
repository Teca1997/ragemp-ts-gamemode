import { HouseWorldDoor } from '../../src/packages/db/entities/HouseWorldDoor';

export const default_house_world_doors: HouseWorldDoor[] = [
	{
		house: 1,
		name: 'Yard gates',
		state: true,
		labelPosition: { x: 0, y: 0, z: 0 },
		interactionColshapePosition: { x: 0, y: 0, z: 0 },
		interactionColshapeRadius: 1
	},
	{
		house: 1,
		name: 'Door inside the house',
		state: true,
		labelPosition: { x: 0, y: 0, z: 0 },
		interactionColshapePosition: { x: 0, y: 0, z: 0 },
		interactionColshapeRadius: 1,
		dimension: 1
	}
];
