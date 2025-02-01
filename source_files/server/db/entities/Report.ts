import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from './Account';
import { ReportType } from './ReportType';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Report extends TimestampEntity {
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

	@ManyToOne(() => Account, (account) => account.accountReportedBy, { nullable: false })
	reportedBy!: number;

	@ManyToOne(() => Account, (account) => account.accountClaimedBy)
	claimedBy?: number;

	@ManyToOne(() => ReportType, (reportType) => reportType.reports, { nullable: false })
	reportType?: number;
}
