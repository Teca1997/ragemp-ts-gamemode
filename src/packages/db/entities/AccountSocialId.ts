import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { SocialId } from './SocialId';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Index(['loginTimestamp'], { unique: true })
export class AccountSocialId {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.accountIps, { nullable: false })
	account!: number;

	@PrimaryColumn({ type: 'int8', name: 'socialIdSocialId' })
	@ManyToOne(() => SocialId, (socialId) => socialId.socialId, { nullable: false })
	socialId!: number;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	loginTimestamp?: Date;
}
