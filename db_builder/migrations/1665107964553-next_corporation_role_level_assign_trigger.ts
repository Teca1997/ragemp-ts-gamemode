import { MigrationInterface, QueryRunner } from 'typeorm';

import { greenBright } from 'colorette';

export class nextCorporationRoleAssignTrigger1665107964553 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		CREATE OR REPLACE FUNCTION ${process.env.DB_SCHEMA}.next_corporation_role_level_assign()
 			RETURNS trigger
 		LANGUAGE plpgsql
		AS $$
			DECLARE
				nextCorporationRoleLevel int;
			BEGIN
				select count(*) from ${process.env.DB_SCHEMA}.corporation_role where new."corporationId"="corporationId" into nextCorporationRoleLevel;
				new."roleLevel" = nextCorporationRoleLevel;
				RETURN new;
			END;
		$$;
		`);
		console.log(greenBright('next_corporation_role_level_assign() function created'));
		await queryRunner.query(`
		CREATE TRIGGER next_corporation_role_level_assign_trigger BEFORE
		INSERT ON ${process.env.DB_SCHEMA}.corporation_role 
		FOR EACH ROW EXECUTE FUNCTION ${process.env.DB_SCHEMA}.next_corporation_role_level_assign()
		`);
		console.log(greenBright('next_corporation_role_level_assign_trigger created'));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		DROP TRIGGER IF EXISTS next_corporation_role_level_assign_trigger ON ${process.env.DB_SCHEMA}.corporation_role;
		`);
		await queryRunner.query('');
		console.log('next_corporation_role_level_assign_trigger deleted');
		await queryRunner.query(`
		DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.next_corporation_role_level_assign();
		`);
		await queryRunner.query('');
		console.log('next_corporation_role_level_assign() function deleted!');
	}
}
