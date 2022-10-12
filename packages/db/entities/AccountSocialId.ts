import { CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Account } from './Account';
import { SocialId } from './SocialId';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
@Index(['dateCreated'], { unique: true })
export class AccountSocialId {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.accountIps, { nullable: false })
	account!: number;

	@PrimaryColumn({ type: 'int8', name: 'socialIdSocialId' })
	@ManyToOne(() => SocialId, (socialId) => socialId.socialId, { nullable: false })
	socialId!: number;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;
}
