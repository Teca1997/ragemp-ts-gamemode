import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CorporationRole } from './CorporationRole';
import { House } from './House';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Corporation {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 50 })
	name!: string;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => Vehicle, (vehicle) => vehicle.corporationOwner)
	corporationVehicles?: Vehicle[];

	@OneToMany(() => House, (house) => house.corporationOwner)
	corporationHouses?: House[];

	@OneToMany(() => CorporationRole, (corporationRole) => corporationRole.corporation)
	corporationRoles?: CorporationRole[];
}
