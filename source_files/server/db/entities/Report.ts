import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Account } from './Account';
import { ReportType } from './ReportType';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Report {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	timeCreated?: Date;

	@Column({ nullable: true })
	timeClaimed?: Date;

	@Column({ nullable: true })
	timeClosed?: Date;

	@Column({ type: 'text' })
	reportText!: string;

	@Exclude()
	@CreateDateColumn({ type: 'timestamptz', primary: true })
	dateCreated?: Date;

	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@Exclude()
	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@ManyToOne(() => Account, (account) => account.accountReportedBy, { nullable: false })
	reportedBy!: number | Account;

	@ManyToOne(() => Account, (account) => account.accountClaimedBy)
	claimedBy?: number | Account;

	@ManyToOne(() => ReportType, (reportType) => reportType.reports, { nullable: false })
	reportType?: number | ReportType;
}
