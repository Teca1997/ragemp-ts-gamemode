export class ControlsService {
	private static _instance: ControlsService = new ControlsService();
	public static get instance(): ControlsService {
		return ControlsService._instance;
	}
	private _allControlActionsState = false;

	public get allControlActionsState() {
		return this._allControlActionsState;
	}
	public set allControlActionsState(value) {
		this._allControlActionsState = value;
		if (!value) {
			mp.console.logInfo('started disabling controls');
			this.startDisableAllControlActions();
		}
	}

	private constructor() {
		this.startDisableAllControlActions.bind(this);
		mp.events.add('playerReady', this.playerReady.bind(this));
		mp.console.logInfo(`[INFO] Controls service started...`);
	}

	private playerReady() {
		this.allControlActionsState = false;
	}

	private async startDisableAllControlActions() {
		if (!this.allControlActionsState) {
			//mp.gui.chat.push(Date.now().toString());
			mp.game.controls.disableAllControlActions(0);
			await mp.game.waitAsync(5);
			this.startDisableAllControlActions();
		} else {
			mp.console.logInfo('stopped disabling');
		}
	}
}
