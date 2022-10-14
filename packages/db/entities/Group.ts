import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { GroupRole } from './GroupRole';
import { House } from './House';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Group {
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

	@OneToMany(() => Vehicle, (vehicle) => vehicle.groupOwner)
	groupVehicle?: number[];

	@OneToMany(() => House, (house) => house.groupOwner)
	groupHouses?: number[];

	@OneToMany(() => GroupRole, (groupRole) => groupRole.group)
	groupRoles?: GroupRole[];
}
