import { Database } from '../db';
import { Ip } from '../db/entities/Ip';
import { Serial } from '../db/entities/Serial';
import { SocialClub } from '../db/entities/SocialClub';
import { yellow } from 'colorette';

export class PunishmentService {
	private static _instance: PunishmentService = new PunishmentService();

	public static get instance(): PunishmentService {
		return PunishmentService._instance;
	}

	private constructor() {
		mp.events.add('playerJoin', this.playerJoin);
		console.log(`${yellow('[INFO]')} Punishment service started...`);
	}

	private async playerJoin(player: PlayerMp) {
		const { socialClub, serial, ip } = player;
		await Database.datasource.getRepository(SocialClub).save(new SocialClub(socialClub));
		await Database.datasource.getRepository(Serial).save(new Serial(serial));
		await Database.datasource.getRepository(Ip).save(new Ip(ip));
	}
}
