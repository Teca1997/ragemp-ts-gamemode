import { Vehicle } from '../../packages/systems/db/entities/Vehicle';

export const default_vehicles: Vehicle[] = [
	{
		model: 'comet3',
		position: {
			location: {
				x: 0,
				y: 0,
				z: 0
			},
			heading: 0,
			dimension: 0
		},
		mods: [
			{
				modType: 1,
				description: 'Engine',
				value: 1
			}
		]
	},
	{
		model: 'comet3',
		position: {
			location: {
				x: 0,
				y: 0,
				z: 0
			},
			heading: 0,
			dimension: 0
		},
		characterOwner: 1,
		mods: [
			{
				modType: 1,
				description: 'Engine',
				value: 1
			}
		]
	}
];
