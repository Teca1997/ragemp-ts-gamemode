import { DataSource } from 'typeorm';

import { config } from 'dotenv';
import path from 'path';
import { default_accounts } from '../../shared/data/accounts';
import { default_characters } from '../../shared/data/characters';
import { default_roles } from '../../shared/data/roles';
import { Account } from '../db/entities/Account';
import { Character } from '../db/entities/Character';
import { Role } from '../db/entities/Role';

config({
	path: path.resolve('.env')
});

console.log(__dirname);

(async () => {
	const datasource = new DataSource({
		type: 'postgres',
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD,
		schema: process.env.DB_SCHEMA,
		entities: [__dirname + '/../source_files/server/db/entities/*.ts'],
		logging: process.env.DB_LOGGING === 'true' ? true : false
	});

	try {
		await datasource.initialize();
		await datasource.synchronize(true);

		console.log('Inserting roles');
		for (let index = 0; index < default_roles.length; index++) {
			await datasource
				.getRepository(Role)
				.save(
					new Role(
						default_roles[index].name,
						default_roles[index].description,
						default_roles[index].color
					)
				);
		}

		console.log('Inserting accounts');
		for (let index = 0; index < default_accounts.length; index++) {
			await datasource
				.getRepository(Account)
				.save(
					new Account(
						default_accounts[index].username,
						default_accounts[index].email,
						default_accounts[index].password,
						default_accounts[index].salt,
						default_accounts[index].role
					)
				);
		}

		console.log('Inserting characters');
		for (let index = 0; index < default_characters.length; index++) {
			await datasource.getRepository(Character).save(default_characters[index]);
		}

		process.exit(1);
	} catch (error) {
		console.log(error);
	}
})();
