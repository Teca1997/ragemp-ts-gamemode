import { MigrationInterface, QueryRunner } from 'typeorm';

import { greenBright } from 'colorette';

export class nextGroupRoleAssignTrigger1665107964555 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		CREATE OR REPLACE FUNCTION ${process.env.DB_SCHEMA}.next_group_role_level_assign()
 			RETURNS trigger
 		LANGUAGE plpgsql
		AS $$
			DECLARE
				nextgroupRoleLevel int;
			BEGIN
				select count(*) from ${process.env.DB_SCHEMA}.group_role where new."groupId"="groupId" into nextgroupRoleLevel;
				new."roleLevel" = nextgroupRoleLevel;
				RETURN new;
			END;
		$$;
		`);
		console.log(greenBright('next_group_role_level_assign() function created'));
		await queryRunner.query(`
		CREATE TRIGGER next_group_role_level_assign_trigger BEFORE
		INSERT ON ${process.env.DB_SCHEMA}.group_role 
		FOR EACH ROW EXECUTE FUNCTION ${process.env.DB_SCHEMA}.next_group_role_level_assign()
		`);
		console.log(greenBright('next_group_role_level_assign_trigger created'));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		DROP TRIGGER IF EXISTS next_group_role_level_assign_trigger ON ${process.env.DB_SCHEMA}.group_role;
		`);
		await queryRunner.query('');
		console.log('next_group_role_level_assign_trigger deleted');
		await queryRunner.query(`
		DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.next_group_role_level_assign();
		`);
		await queryRunner.query('');
		console.log('next_group_role_level_assign() function deleted!');
	}
}
