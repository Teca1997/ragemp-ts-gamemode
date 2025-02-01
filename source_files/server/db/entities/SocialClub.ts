import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AccountSocialClub } from './AccountSocialClub';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class SocialClub extends TimestampEntity {
	@PrimaryColumn({ type: 'varchar', length: 128 })
	id!: string;

	@OneToMany(() => AccountSocialClub, (accountSocialClub) => accountSocialClub.socialClub)
	accountSocialClubs?: AccountSocialClub[] | string[];

	constructor(id: string) {
		super();
		this.id = id;
	}
}
