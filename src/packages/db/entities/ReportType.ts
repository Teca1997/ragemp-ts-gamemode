import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Report } from './Report';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class ReportType {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 50 })
	name!: string;

	@OneToMany(() => Report, (report) => report.reportType)
	reports?: Report[];
}
