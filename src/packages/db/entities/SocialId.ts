import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Account } from './Account';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class SocialId {
	@PrimaryColumn({ type: 'int8' })
	socialId!: number;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	timeAdded?: Date;

	@OneToMany(() => Account, (account) => account.accountSocialIds, { nullable: false })
	accountSocialId?: string[];
}
