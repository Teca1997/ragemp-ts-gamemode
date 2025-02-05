import { Account } from './entities/Account';
import { AccountIp } from './entities/AccountIp';
import { AccountPunishment } from './entities/AccountPunishment';
import { AccountSerial } from './entities/AccountSerial';
import { AccountSocialClub } from './entities/AccountSocialClub';
import { Alias } from './entities/Alias';
import { Character } from './entities/Character';
import { CharacterDeathLog } from './entities/CharacterDeathLog';
import { CharacterIdLog } from './entities/CharacterIdLog';
import { DataSourceOptions } from 'typeorm';
import { Ip } from './entities/Ip';
import { Punishment } from './entities/Punishment';
import { Report } from './entities/Report';
import { ReportType } from './entities/ReportType';
import { Role } from './entities/Role';
import { Serial } from './entities/Serial';
import { SocialClub } from './entities/SocialClub';
import { TimestampEntity } from './entities/TimestampEntity';
import { Vehicle } from './entities/Vehicle';
import { WorldDoor } from './entities/WorldDoor';
import { config } from 'dotenv';
import path from 'path';

config({
	path: path.resolve('.env')
});

export const databaseConfig: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	schema: process.env.DB_SCHEMA,
	entities: [
		Account,
		AccountIp,
		AccountPunishment,
		AccountSerial,
		AccountSocialClub,
		Alias,
		Character,
		CharacterDeathLog,
		CharacterIdLog,
		Ip,
		Punishment,
		Report,
		ReportType,
		Role,
		Serial,
		SocialClub,
		TimestampEntity,
		Vehicle,
		WorldDoor
	],
	logging: process.env.DB_LOGGING === 'true' ? true : false
};
