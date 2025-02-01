import { Entity, OneToMany } from 'typeorm';

import { CorporationRole } from './CorporationRole';
import { House } from './House';
import { Organization } from './Organization';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Corporation extends Organization {
	@OneToMany(() => Vehicle, (vehicle) => vehicle.corporationOwner)
	corporationVehicles?: Vehicle[];

	@OneToMany(() => House, (house) => house.corporationOwner)
	corporationHouses?: House[];

	@OneToMany(() => CorporationRole, (corporationRole) => corporationRole.corporation)
	corporationRoles?: CorporationRole[];
}
