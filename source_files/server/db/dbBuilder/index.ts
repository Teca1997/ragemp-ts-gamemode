import { Account } from '../entities/Account';
import { Character } from '../entities/Character';
import { DataSource } from 'typeorm';
import { Role } from '../entities/Role';
import { databaseConfig } from '../config';
import { default_accounts } from './default_data/account';
import { default_characters } from './default_data/characters';
import { default_roles } from './default_data/roles';

(async () => {
	const datasource = new DataSource(databaseConfig);

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
