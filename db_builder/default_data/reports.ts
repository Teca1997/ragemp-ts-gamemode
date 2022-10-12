import { Report } from '../..//packages/db/entities/Report';

export const default_reports: Report[] = [
	{
		reportText: 'first report',
		reportedBy: 1,
		reportType: 1
	},
	{
		reportText: 'second report',
		reportedBy: 1,
		reportType: 1,
		claimedBy: 1
	}
];
