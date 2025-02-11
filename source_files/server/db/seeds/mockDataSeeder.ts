import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { default_accounts } from '../../../shared/data/accounts';
import { default_characters } from '../../../shared/data/characters';
import { default_roles } from '../../../shared/data/roles';
import { Account } from '../entities/Account';
import { Character } from '../entities/Character';
import { Role } from '../entities/Role';

export class Mock implements Seeder {
	public async run(datasource: DataSource, _factoryManager: SeederFactoryManager) {
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
	}
}
