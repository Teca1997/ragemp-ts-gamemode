import { MigrationInterface, QueryRunner } from 'typeorm';

import { greenBright } from 'colorette';

export class createQueryUser1665107964549 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`	
			CREATE USER ${process.env.DB_USERNAME} WITH PASSWORD '${process.env.DB_PASSWORD}';
			GRANT SELECT, INSERT, UPDATE, DELETE 
			ON ALL TABLES IN SCHEMA ${process.env.DB_SCHEMA} 
			TO ${process.env.DB_USERNAME};

			GRANT CONNECT ON DATABASE ${process.env.DB_DATABASE} to ${process.env.DB_USERNAME};

			GRANT USAGE ON SCHEMA ${process.env.DB_SCHEMA} TO ${process.env.DB_USERNAME};
		`);
		console.log(
			greenBright(`
				${process.env.DB_USERNAME} user created and granted 
				SELECT, INSERT, UPDATE AND DELETE in schema ${process.env.DB_SCHEMA};
			`)
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DO
			$DO$
			BEGIN
				IF EXISTS (
					SELECT FROM pg_catalog.pg_roles
					WHERE  rolname = '${process.env.DB_USERNAME}') THEN
						REVOKE ALL ON DATABASE ${process.env.DB_DATABASE} FROM ${process.env.DB_USERNAME};
						
						REVOKE ALL ON SCHEMA ${process.env.DB_SCHEMA} FROM ${process.env.DB_USERNAME};
						DROP USER ${process.env.DB_USERNAME};
				END IF;
			END
			$DO$;
		`);
		console.log(`user ${process.env.DB_USERNAME} deleted`);
	}
}
