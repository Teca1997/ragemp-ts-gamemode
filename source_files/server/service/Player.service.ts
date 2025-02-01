import { CharacterDeathLog } from '../db/entities/CharacterDeathLog';
import { Database } from '../db';
import { yellow } from 'colorette';

export class PlayerService {
	private static _instance: PlayerService = new PlayerService();

	private constructor() {
		mp.events.add('playerDeath', this.playerDeath);
		console.log(`${yellow('[INFO]')} Player service started...`);
	}

	private async playerDeath(player: PlayerMp, reason: number, killer: PlayerMp | undefined) {
		player.spawn(new Vector3(0, 0, 0));
		if (!player.activeCharacter) return;

		const deathLog = new CharacterDeathLog(player.activeCharacter!, killer?.activeCharacter, reason);
		try {
			await Database.datasource.getRepository(CharacterDeathLog).save(deathLog);
		} catch (error) {
			console.log(error);
		}
	}

	public static get instance(): PlayerService {
		return PlayerService._instance;
	}
}
