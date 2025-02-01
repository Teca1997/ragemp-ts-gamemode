import { Entity, OneToMany } from 'typeorm';

import { GroupRole } from './GroupRole';
import { House } from './House';
import { Organization } from './Organization';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Group extends Organization {
	@OneToMany(() => Vehicle, (vehicle) => vehicle.groupOwner)
	groupVehicle?: number[];

	@OneToMany(() => House, (house) => house.groupOwner)
	groupHouses?: number[];

	@OneToMany(() => GroupRole, (groupRole) => groupRole.group)
	groupRoles?: GroupRole[];
}
