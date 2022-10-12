import { Character } from '../../packages/db/entities/Character';

export const default_characters: Character[] = [
	{
		firstname: 'John',
		lastname: 'Doe',
		appearance: {},
		location: { x: 0, y: 0, z: 0 },
		dateOfBirth: '1990-01-01',
		nationality: 'n/a',
		story: 'Lorem ipsum',
		inventory: {},
		account: 1
	},
	{
		firstname: 'Jane',
		lastname: 'Doe',
		appearance: {},
		location: { x: 0, y: 0, z: 0 },
		dateOfBirth: '1990-01-01',
		nationality: 'n/a',
		story: 'Lorem ipsum',
		inventory: {},
		account: 2
	}
];
