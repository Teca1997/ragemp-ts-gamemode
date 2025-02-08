import { Role } from '../../server/db/entities/Role';

export const default_roles: Role[] = [
	{
		name: 'Unverified user',
		description: 'User that has registered, but has not yet confirmed their email adress',
		color: '#000000'
	},
	{
		name: 'Verified user',
		description: 'User that has registered, and confirmed their email adress',
		color: '#FFFFFF'
	}
];
