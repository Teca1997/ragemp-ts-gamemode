import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class SocialId extends TimestampEntity {
	@PrimaryColumn({ type: 'int8' })
	socialId!: number;

	@OneToMany(() => Account, (account) => account.accountSocialIds, { nullable: false })
	accountSocialId?: string[];
}
