import 'reflect-metadata';

import { DataSource, Repository } from 'typeorm';
import { greenBright, red } from 'colorette';

import { Account } from '../packages/db/entities/Account';
import { AccountIp } from '../packages/db/entities/AccountIp';
import { AccountSerial } from '../packages/db/entities/AccountSerial';
import { AccountSocialId } from '../packages/db/entities/AccountSocialId';
import { Alias } from '../packages/db/entities/Alias';
import { Character } from '../packages/db/entities/Character';
import { CharacterPunishment } from '../packages/db/entities/CharacterPunishment';
import { Corporation } from '../packages/db/entities/Corporation';
import { CorporationRole } from '../packages/db/entities/CorporationRole';
import { Group } from '../packages/db/entities/Group';
import { House } from '../packages/db/entities/House';
import { HouseWorldDoor } from '../packages/db/entities/HouseWorldDoor';
import { Interior } from '../packages/db/entities/Interior';
import { Ip } from '../packages/db/entities/Ip';
import { Punishment } from '../packages/db/entities/Punishment';
import { Report } from '../packages/db/entities/Report';
import { ReportType } from '../packages/db/entities/ReportType';
import { Role } from '../packages/db/entities/Role';
import { Serial } from '../packages/db/entities/Serial';
import { SocialId } from '../packages/db/entities/SocialId';
import { Vehicle } from '../packages/db/entities/Vehicle';
import { config } from 'dotenv';
import { createQueryUser1665107964549 } from './migrations/1665107964549-create_query_user';
import { default_acount_ips } from './default_data/accountips';
import { default_acount_serials } from './default_data/accountserials';
import { default_acount_socialids } from './default_data/accountsocialids';
import { default_acounts } from './default_data/account';
import { default_aliases } from './default_data/aliases';
import { default_character_punishments } from './default_data/characterpunishments';
import { default_characters } from './default_data/characters';
import { default_corporation_roles } from './default_data/corporationroles';
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
import { newVehiclePlateGenerationTrigger1665107964550 } from './migrations/1665107964550-new_vehicle_plate_trigger';
import { nextCorporationRoleAssignTrigger1665107964553 } from './migrations/1665107964553-next_corporation_role_level_assign_trigger';
import { nextHouseNumberTrigger1665107964551 } from './migrations/1665107964551-next_house_number_trigger';
import path from 'path';
import { setReportClaimedTimeTrigger1665107964552 } from './migrations/1665107964552-set_report_claimed_time_trigger';

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
	entities: ['./packages/db/entities/*.ts'],
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
			const queryRunner = AppDataSource.createQueryRunner();
			await new nextCorporationRoleAssignTrigger1665107964553().down(queryRunner);
			await new setReportClaimedTimeTrigger1665107964552().down(queryRunner);
			await new nextHouseNumberTrigger1665107964551().down(queryRunner);
			await new newVehiclePlateGenerationTrigger1665107964550().down(queryRunner);
			await new createQueryUser1665107964549().down(queryRunner);
		}
		AppDataSource.synchronize(process.env.DB_SYNCHRONISE === 'true' ? true : false)
			.then(() => {
				AppDataSource.runMigrations()
					.then(async () => {
						if (process.env.DB_INSERTDATA === 'true' ? true : false) {
							await insert_default_data()
								.then(async () => {})
								.catch((error) => {
									console.log(red('Error inserting data\n') + error);
								});
						}
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
		.into(CorporationRole)
		.values(default_corporation_roles)
		.returning(`*`)
		.execute()
		.then((result) => {
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('-------corporationroles data inserted--------'));
			console.log(greenBright('---------------------------------------------'));
			result.raw.map((row: CorporationRole) => {
				console.log(row);
			});
			console.log(greenBright('---------------------------------------------'));
			console.log(greenBright('-------corporationroles data inserted--------'));
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

	const characterRepository: Repository<Character> = await AppDataSource.getRepository(Character);
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('----------characters data inserted-----------'));
	console.log(greenBright('---------------------------------------------'));
	await Promise.all(
		default_characters.map(async (character: Character) => {
			console.log(await characterRepository.save(characterRepository.create(character)));
		})
	);
	console.log(greenBright('---------------------------------------------'));
	console.log(greenBright('----------characters data inserted-----------'));
	console.log(greenBright('---------------------------------------------'));

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

	return;
}
