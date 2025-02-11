import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { AccountSocialClub } from './AccountSocialClub';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class SocialClub {
	@PrimaryColumn({ type: 'varchar', length: 128 })
	id!: string;

	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@OneToMany(() => AccountSocialClub, (accountSocialClub) => accountSocialClub.socialClub)
	accountSocialClubs?: AccountSocialClub[] | string[];

	constructor(id: string) {
		this.id = id;
	}
}
