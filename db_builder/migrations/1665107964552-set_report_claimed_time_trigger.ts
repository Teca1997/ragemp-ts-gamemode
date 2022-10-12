import { MigrationInterface, QueryRunner } from 'typeorm';

import { greenBright } from 'colorette';

export class setReportClaimedTimeTrigger1665107964552 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		CREATE OR REPLACE FUNCTION ${process.env.DB_SCHEMA}.set_report_claimed_time()
 			RETURNS trigger
 			LANGUAGE plpgsql
		AS $$
		DECLARE
		begin
			new."timeClaimed" = current_timestamp;
			return new;
		END;
		$$;
		`);
		console.log(greenBright('set_report_claimed_time() function created'));
		await queryRunner.query(`
		CREATE TRIGGER set_report_claimed_time_trigger BEFORE
		UPDATE OF "claimedById" ON ${process.env.DB_SCHEMA}.report 
		FOR EACH ROW EXECUTE FUNCTION ${process.env.DB_SCHEMA}.set_report_claimed_time()
		`);
		console.log(greenBright('set_report_claimed_time_trigger created'));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		DROP TRIGGER IF EXISTS set_report_claimed_time_trigger ON ${process.env.DB_SCHEMA}.report;
		`);
		console.log('next_house_number_assign_trigger deleted');
		await queryRunner.query(`
		DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.set_report_claimed_time();
		`);
		console.log('set_report_claimed_time() function deleted!');
	}
}
