import { MigrationInterface, QueryRunner } from 'typeorm';

import { config } from 'dotenv';
import { greenBright } from 'colorette';
import path from 'path';

config({
	path: path.resolve('.env')
});

export class nextHouseNumberTrigger1665107964551 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		CREATE FUNCTION ${process.env.DB_SCHEMA}.next_house_number_assign() RETURNS trigger
			LANGUAGE plpgsql
			AS $$
		DECLARE
			nextHouseNumber int;
		BEGIN
			select count(*) + 1 from ${process.env.DB_SCHEMA}.house h where new."street" like h."street" into nextHouseNumber;
			new."houseNumber" = nextHouseNumber;
			RETURN new;
		END;
		$$;
		`);
		console.log(greenBright('next_house_number_assign() function created'));

		await queryRunner.query(`
		CREATE TRIGGER next_house_number_assign_trigger 
		BEFORE INSERT ON ${process.env.DB_SCHEMA}.house 
		FOR EACH ROW EXECUTE FUNCTION ${process.env.DB_SCHEMA}.next_house_number_assign();
		`);
		console.log(greenBright('next_house_number_assign_trigger created'));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		DROP TRIGGER IF EXISTS next_house_number_assign_trigger ON ${process.env.DB_SCHEMA}.house;
		`);
		console.log('next_house_number_assign_trigger deleted');

		await queryRunner.query(`
		DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.next_house_number_assign();
		`);
		console.log('next_house_number_assign() function deleted');
	}
}
