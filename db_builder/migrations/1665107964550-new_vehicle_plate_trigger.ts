import { MigrationInterface, QueryRunner } from 'typeorm';

import { greenBright } from 'colorette';

export class newVehiclePlateGenerationTrigger1665107964550 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		CREATE FUNCTION ${process.env.DB_SCHEMA}.new_vehicle_plate_generation() RETURNS trigger
			LANGUAGE plpgsql
			AS $$
		DECLARE
			new_plate text;
		BEGIN
			new_plate := 'LS' || UPPER(SUBSTRING(MD5(''||NOW()::TEXT||RANDOM()::TEXT) FOR 6));
			while exists (select * from ${process.env.DB_SCHEMA}.vehicle where plate like new_plate) loop
				new_plate := UPPER(SUBSTRING(MD5(''||NOW()::TEXT||RANDOM()::TEXT) FOR 8));
			end loop;
			new.plate = new_plate;
			return new;
		END;
		$$;
		`);
		console.log(greenBright('new_vehicle_plate_generation() function created'));
		await queryRunner.query(`
		CREATE TRIGGER new_vehicle_plate_generation_trigger 
		BEFORE INSERT ON ${process.env.DB_SCHEMA}.vehicle 
		FOR EACH ROW EXECUTE FUNCTION ${process.env.DB_SCHEMA}.new_vehicle_plate_generation();
		`);
		console.log(greenBright('new_vehicle_plate_generation_trigger created'));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		DROP TRIGGER IF EXISTS new_vehicle_plate_generation_trigger ON ${process.env.DB_SCHEMA}.vehicle;
		`);
		console.log('next_house_number_assign_trigger deleted');
		await queryRunner.query(`
		DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.new_vehicle_plate_generation();
		`);
		console.log('new_vehicle_plate_generation() function deleted');
	}
}
