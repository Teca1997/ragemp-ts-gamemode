import { MigrationInterface, QueryRunner } from 'typeorm';

import { greenBright } from 'colorette';

export class insertOwnerRoleForNewGroupTrigger1665107964556 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		CREATE OR REPLACE FUNCTION ${process.env.DB_SCHEMA}.insert_owner_role_for_new_group()
 			RETURNS trigger
 		LANGUAGE plpgsql
		AS $$
			BEGIN
				INSERT INTO ${process.env.DB_SCHEMA}.group_role ("name", "groupId") VALUES ('Leader', new.id);
				RETURN new;
			END;
		$$;
		`);
		console.log(greenBright('insert_owner_role_for_new_group() function created'));
		await queryRunner.query(`
		CREATE TRIGGER insert_owner_role_for_new_group_trigger
		AFTER INSERT ON ${process.env.DB_SCHEMA}.group 
		FOR EACH ROW EXECUTE FUNCTION ${process.env.DB_SCHEMA}.insert_owner_role_for_new_group()
		`);
		console.log(greenBright('insert_owner_role_for_new_group_trigger created'));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		DROP TRIGGER IF EXISTS insert_owner_role_for_new_group_trigger ON ${process.env.DB_SCHEMA}.group;
		`);
		console.log('insert_owner_role_for_new_group_trigger deleted');
		await queryRunner.query(`
		DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.insert_owner_role_for_new_group();
		`);
		console.log('insert_owner_role_for_new_group() function deleted!');
	}
}
