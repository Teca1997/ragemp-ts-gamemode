import 'reflect-metadata';

import { blue, greenBright, red } from 'colorette';

import { Account } from '../src/packages/db/entities/Account';
import { AccountIp } from '../src/packages/db/entities/AccountIp';
import { AccountSerial } from '../src/packages/db/entities/AccountSerial';
import { AccountSocialId } from '../src/packages/db/entities/AccountSocialId';
import { Alias } from '../src/packages/db/entities/Alias';
import { Character } from '../src/packages/db/entities/Character';
import { CharacterPunishment } from '../src/packages/db/entities/CharacterPunishment';
import { Corporation } from '../src/packages/db/entities/Corporation';
import { DataSource } from 'typeorm';
import { Group } from '../src/packages/db/entities/Group';
import { House } from '../src/packages/db/entities/House';
import { HouseWorldDoor } from '../src/packages/db/entities/HouseWorldDoor';
import { Interior } from '../src/packages/db/entities/Interior';
import { Ip } from '../src/packages/db/entities/Ip';
import { Punishment } from '../src/packages/db/entities/Punishment';
import { Report } from '../src/packages/db/entities/Report';
import { ReportType } from '../src/packages/db/entities/ReportType';
import { Role } from '../src/packages/db/entities/Role';
import { Serial } from '../src/packages/db/entities/Serial';
import { SocialId } from '../src/packages/db/entities/SocialId';
import { Vehicle } from '../src/packages/db/entities/Vehicle';
import { config } from 'dotenv';
import { default_acount_ips } from './default_data/accountips';
import { default_acount_serials } from './default_data/accountserials';
import { default_acount_socialids } from './default_data/accountsocialids';
import { default_acounts } from './default_data/account';
import { default_aliases } from './default_data/aliases';
import { default_character_punishments } from './default_data/characterpunishments';
import { default_characters } from './default_data/characters';
import { default_corporations } from './default_data/corporations';
import { default_groups } from './default_data/groups';
import { default_house_world_doors } from './default_data/houseworlddoors';
import { default_houses } from './default_data/houses';
import { default_interiors } from './default_data/interiors';
import { default_ips } from './default_data/ips';
import { default_punishments } from './default_data/punishments';
import { default_report_types } from './default_data/report_types';
import { default_reports } from './default_data/reports';
import { default_roles } from './default_data/roles';
import { default_serials } from './default_data/serials';
import { default_social_ids } from './default_data/socialids';
import { default_vehicles } from './default_data/vehicles';
import path from 'path';

config({
	path: path.resolve('.env')
});

const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_SUPERUSERNAME,
	database: process.env.DB_DATABASE,
	password: process.env.DB_SUPERPASSWORD,
	schema: process.env.DB_SCHEMA,
	entities: ['../src/packages/db/entities/*.ts'],
	migrations: ['./db_builder/migrations/*.ts'],
	logging: process.env.DB_LOGGING === 'true' ? true : false
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

AppDataSource.initialize()
	.then(async () => {
		console.log(`Datasource initializeed`);
		if (process.env.DB_DROPDB === 'true') {
			await AppDataSource.dropDatabase();
			console.log(blue(`DATABASE DROPPED!!!!!`));
			await AppDataSource.query(`
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
			await AppDataSource.query(`
				DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.next_house_number_assign();
			`);
			await AppDataSource.query(`
				DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.new_vehicle_plate_generation();
			`);
			await AppDataSource.query(`
				DROP FUNCTION IF EXISTS ${process.env.DB_SCHEMA}.set_report_claimed_time();
			`);
		}
		AppDataSource.synchronize(process.env.DB_SYNCHRONISE === 'true' ? true : false)
			.then(() => {
				AppDataSource.runMigrations()
					.then(async () => {
						insert_default_data()
							.then(async () => {})
							.catch((error) => {
								console.log(red('Error inserting data\n') + error);
							});
					})
					.catch((error) => console.log(red(error)));
			})
			.catch((error) => console.log(red(error)));
	})
	.catch((error) => console.log(red(error)));

export async function insert_default_data() {
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Role)
		.values(default_roles)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------roles data inserted--------------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: Role) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------roles data inserted--------------'));
			console.log(greenBright('---------------------------------------------'));
		});
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Interior)
		.values(default_interiors)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('--------interiors data inserted--------------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: Interior) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('--------interiors data inserted--------------'));
			console.log(greenBright('---------------------------------------------'));
		});
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(ReportType)
		.values(default_report_types)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('---------report types data inserted----------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: ReportType) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('---------report types data inserted----------'));
			console.log(greenBright('---------------------------------------------'));
		});

	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('-----------punishments data inserted----------'));
	console.log(greenBright('----------------------------------------------'));
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Punishment)
		.values(default_punishments)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(result.raw[0]);
		});
	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('-----------punishments data inserted----------'));
	console.log(greenBright('----------------------------------------------'));
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Account)
		.values(default_acounts)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------account data inserted------------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: Account) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('-----------accounts data inserted------------'));
			console.log(greenBright('---------------------------------------------'));
		});
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('--------------ips data inserted--------------'));
	console.log(greenBright('---------------------------------------------'));
	await Promise.all(
		default_ips.map(async (ip) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(Ip)
				.values(ip)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('--------------ips data inserted--------------'));
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('----------accountips data inserted-----------'));
	console.log(greenBright('---------------------------------------------'));
	await Promise.all(
		default_acount_ips.map(async (ip) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(AccountIp)
				.values(ip)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('----------accountips data inserted-----------'));
	console.log(greenBright('---------------------------------------------'));

	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('-----------serials data inserted-------------'));
	console.log(greenBright('---------------------------------------------'));
	await Promise.all(
		default_serials.map(async (serial) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(Serial)
				.values(serial)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('-----------serials data inserted-------------'));
	console.log(greenBright('---------------------------------------------'));

	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('--------accountserials data inserted---------'));
	console.log(greenBright('---------------------------------------------'));
	await Promise.all(
		default_acount_serials.map(async (accountSerial) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(AccountSerial)
				.values(accountSerial)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('--------accountserials data inserted---------'));
	console.log(greenBright('---------------------------------------------'));

	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('-----------socialids data inserted-----------'));
	console.log(greenBright('---------------------------------------------'));
	await Promise.all(
		default_social_ids.map(async (socialid) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(SocialId)
				.values(socialid)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('-----------socialids data inserted-----------'));
	console.log(greenBright('---------------------------------------------'));

	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('--------accountsocialids data inserted--------'));
	console.log(greenBright('----------------------------------------------'));
	await Promise.all(
		default_acount_socialids.map(async (socialid) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(AccountSocialId)
				.values(socialid)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('--------accountsocialids data inserted--------'));
	console.log(greenBright('----------------------------------------------'));
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Character)
		.values(default_characters)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('----------characters data inserted-----------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: Character) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('----------characters data inserted-----------'));
			console.log(greenBright('---------------------------------------------'));
		});
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Alias)
		.values(default_aliases)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------aliases data inserted------------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: Alias) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------aliases data inserted------------'));
			console.log(greenBright('---------------------------------------------'));
		});
	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('------characterpunishments data inserted------'));
	console.log(greenBright('----------------------------------------------'));
	await Promise.all(
		default_character_punishments.map(async (characterPunishment) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(CharacterPunishment)
				.values(characterPunishment)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('------characterpunishments data inserted------'));
	console.log(greenBright('----------------------------------------------'));

	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Corporation)
		.values(default_corporations)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('--------corporations data inserted-----------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: Corporation) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('--------corporations data inserted-----------'));
			console.log(greenBright('---------------------------------------------'));
		});
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(Group)
		.values(default_groups)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------groups data inserted-------------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: Group) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------groups data inserted-------------'));
			console.log(greenBright('---------------------------------------------'));
		});
	await AppDataSource.createQueryBuilder()
		.insert()
		.into(House)
		.values(default_houses)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------houses data inserted-------------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: House) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('------------houses data inserted-------------'));
			console.log(greenBright('---------------------------------------------'));
		});

	await AppDataSource.createQueryBuilder()
		.insert()
		.into(HouseWorldDoor)
		.values(default_house_world_doors)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('-------houseworlddoors data inserted---------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: HouseWorldDoor) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('-------houseworlddoors data inserted---------'));
			console.log(greenBright('---------------------------------------------'));
		});

	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('-----------reports data inserted--------------'));
	console.log(greenBright('----------------------------------------------'));
	await Promise.all(
		default_reports.map(async (report) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(Report)
				.values(report)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('-----------reports data inserted--------------'));
	console.log(greenBright('----------------------------------------------'));

	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('-----------vehicles data inserted-------------'));
	console.log(greenBright('----------------------------------------------'));
	await Promise.all(
		default_vehicles.map(async (vehicle) => {
			await AppDataSource.createQueryBuilder()
				.insert()
				.into(Vehicle)
				.values(vehicle)
				.returning(`*`)
				.execute()
				.then((result) => {
					console.log(result.raw[0]);
				});
		})
	);
	console.log(greenBright('----------------------------------------------'));
	console.log(greenBright('-----------vehicles data inserted-------------'));
	console.log(greenBright('----------------------------------------------'));
}
