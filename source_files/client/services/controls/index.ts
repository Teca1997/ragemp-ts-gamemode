export class ControlsService {
	private static _instance: ControlsService = new ControlsService();
	private _allControlActionsState = false;

	public get allControlActionsState() {
		return this._allControlActionsState;
	}
	public set allControlActionsState(value) {
		if (!value) {
			this.startDisableAllControlActions();
		}
		this._allControlActionsState = value;
	}

	private constructor() {
		this.startDisableAllControlActions.bind(this);
		mp.console.logInfo(`[INFO] Controls service started...`);
	}

	public static get instance(): ControlsService {
		return ControlsService._instance;
	}

	private async startDisableAllControlActions() {
		if (!this.allControlActionsState) {
			mp.game.controls.disableControlAction(0, 24, false);
			mp.game.controls.disableControlAction(0, 25, false);
			mp.game.controls.disableControlAction(0, 69, false);
			mp.game.controls.disableControlAction(0, 92, false);
			mp.game.controls.disableControlAction(0, 114, false);
			mp.game.controls.disableControlAction(0, 140, false);
			mp.game.controls.disableControlAction(0, 141, false);
			mp.game.controls.disableControlAction(0, 142, false);
			mp.game.controls.disableControlAction(0, 257, false);
			await mp.game.waitAsync(2);
			this.startDisableAllControlActions();
		}
	}
}
