import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Character } from './Character';
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

	@ManyToOne(() => Character, (character) => character.characterReportedBy, { nullable: false })
	reportedBy!: number;

	@ManyToOne(() => Character, (character) => character.characterClaimedBy)
	claimedBy?: number;

	@ManyToOne(() => ReportType, (reportType) => reportType.reports, { nullable: false })
	reportType?: number;
}
