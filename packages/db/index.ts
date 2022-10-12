import * as util from 'util';

import { green, greenBright, red } from 'colorette';

import { Account } from './entities/Account';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';

config({
	path: path.resolve('.env')
});

export const db = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	schema: process.env.DB_SCHEMA,
	entities: ['./packages/db/entities/*.js'],
	migrations: ['./packages/db/migrations/*.js'],
	logging: process.env.DB_LOGGING === 'true' ? true : false
});

util.inspect.defaultOptions.depth = null;

db.initialize().then(async () => {
	console.log(green('Database initialized.'));
	await db
		.getRepository(Account)
		.find()
		.then(async (result: any) => {
			console.log(greenBright('Accounts retrieved from databasa.\n'));
			await map_result_to_console(result);
			console.log(greenBright('Accounts retrieved from databasa.\n'));
		})
		.catch((error: string) => {
			console.log(red('Error retrieving accounts from database\n') + error);
		});
});

async function map_result_to_console(result: any[]): Promise<boolean> {
	await Promise.all(
		result.map((row) => {
			console.log(row);
		})
	);
	return true;
}
