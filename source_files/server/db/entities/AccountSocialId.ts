import { Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { SocialId } from './SocialId';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Index(['dateCreated'], { unique: true })
export class AccountSocialId extends TimestampEntity {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.accountIps, { nullable: false })
	account!: number;

	@PrimaryColumn({ type: 'int8', name: 'socialIdSocialId' })
	@ManyToOne(() => SocialId, (socialId) => socialId.socialId, { nullable: false })
	socialId!: number;
}
