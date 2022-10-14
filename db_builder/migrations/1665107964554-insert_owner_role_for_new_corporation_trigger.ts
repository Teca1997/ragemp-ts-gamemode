import { MigrationInterface, QueryRunner } from 'typeorm';

import { greenBright } from 'colorette';

export class insertOwnerRoleForNewCoporationTrigger1665107964554 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		CREATE OR REPLACE FUNCTION ${process.env.DB_SCHEMA}.insert_owner_role_for_new_corporation()
 			RETURNS trigger
 		LANGUAGE plpgsql
		AS $$
			BEGIN
				INSERT INTO ${process.env.DB_SCHEMA}.corporation_role ("name", "corporationId") VALUES ('Owner', new.id);
				RETURN new;
			END;
		$$;
		`);
		console.log(greenBright('insert_owner_role_for_new_corporation() function created'));
		await queryRunner.query(`
		CREATE TRIGGER insert_owner_role_for_new_corporation_trigger
		AFTER INSERT ON ${process.env.DB_SCHEMA}.corporation 
		FOR EACH ROW EXECUTE FUNCTION ${process.env.DB_SCHEMA}.insert_owner_role_for_new_corporation()
		`);
		console.log(greenBright('insert_owner_role_for_new_corporation_trigger created'));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		DROP TRIGGER IF EXISTS insert_owner_role_for_new_corporation_trigger ON ${process.env.DB_SCHEMA}.corporation;
		`);
		console.log('insert_owner_role_for_new_corporation_trigger deleted');
		await queryRunner.query(`
		DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.insert_owner_role_for_new_corporation();
		`);
		console.log('insert_owner_role_for_new_corporation() function deleted!');
	}
}
