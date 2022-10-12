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
				${process.env.DB_USERNAME} user created and granted SELECT, INSERT, UPDATE AND DELETE in schema ${process.env.DB_SCHEMA};
			`)
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`REVOKE ALL ON DATABASE ${process.env.DB_DATABASE} FROM ${process.env.DB_USERNAME};`);
		await queryRunner.query(`revoke select, update, delete, insert on all tables in ${process.env.DB_SCHEMA} test ${process.env.DB_USERNAME};`);
		await queryRunner.query(`DROP USER ${process.env.DB_USERNAME};`);
		console.log(`user ${process.env.DB_USERNAME} deleted`);
	}
}
