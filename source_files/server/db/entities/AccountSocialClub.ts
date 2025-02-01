import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { SocialClub } from './SocialClub';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class AccountSocialClub extends TimestampEntity {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.id, { nullable: false })
	account!: number;

	@PrimaryColumn('varchar', { length: 128, name: 'socialClubid' })
	@ManyToOne(() => SocialClub, (socialClub) => socialClub.id, { nullable: false })
	socialClub!: string;
}
