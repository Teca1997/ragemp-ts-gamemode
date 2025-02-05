export class PlayerService {
	private static _instance: PlayerService = new PlayerService();

	private constructor() {
		mp.console.logInfo(`[INFO] Player service started...`);
	}

	public static get instance(): PlayerService {
		return PlayerService._instance;
	}
}
