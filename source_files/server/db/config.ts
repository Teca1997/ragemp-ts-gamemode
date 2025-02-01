import { Account } from './entities/Account';
import { AccountIp } from './entities/AccountIp';
import { AccountSerial } from './entities/AccountSerial';
import { AccountSocialId } from './entities/AccountSocialId';
import { Alias } from './entities/Alias';
import { Character } from './entities/Character';
import { CharacterCorporationRole } from './entities/CharacterCorporationRole';
import { CharacterDeathLog } from './entities/CharacterDeathLog';
import { CharacterGroupRole } from './entities/CharacterGroupRole';
import { CharacterIdLog } from './entities/CharacterIdLog';
import { CharacterPunishment } from './entities/CharacterPunishment';
import { Corporation } from './entities/Corporation';
import { CorporationRole } from './entities/CorporationRole';
import { DataSourceOptions } from 'typeorm';
import { Group } from './entities/Group';
import { GroupRole } from './entities/GroupRole';
import { House } from './entities/House';
import { HouseWorldDoor } from './entities/HouseWorldDoor';
import { Interior } from './entities/Interior';
import { Ip } from './entities/Ip';
import { Organization } from './entities/Organization';
import { Property } from './entities/Property';
import { Punishment } from './entities/Punishment';
import { Report } from './entities/Report';
import { ReportType } from './entities/ReportType';
import { Role } from './entities/Role';
import { Serial } from './entities/Serial';
import { SocialId } from './entities/SocialId';
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
		AccountSerial,
		AccountSocialId,
		Alias,
		Character,
		CharacterCorporationRole,
		CharacterDeathLog,
		CharacterGroupRole,
		CharacterIdLog,
		CharacterPunishment,
		Corporation,
		CorporationRole,
		Group,
		GroupRole,
		House,
		HouseWorldDoor,
		Interior,
		Ip,
		Organization,
		Property,
		Punishment,
		Report,
		ReportType,
		Role,
		Serial,
		SocialId,
		TimestampEntity,
		Vehicle,
		WorldDoor
	],
	logging: process.env.DB_LOGGING === 'true' ? true : false
};
