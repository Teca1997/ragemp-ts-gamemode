import { ControlsService } from '../controls';
import { UIService } from '../ui';

export class PlayerService {
	private static _instance: PlayerService = new PlayerService();

	private constructor() {
		mp.events.add('playerReady', this.playerReady.bind(this));
		mp.console.logInfo(`[INFO] Player service started...`);
	}

	private playerReady() {
		UIService.instance.showGameUI(false);
		ControlsService.instance.allControlActionsState = false;
	}

	public static get instance(): PlayerService {
		return PlayerService._instance;
	}
}
