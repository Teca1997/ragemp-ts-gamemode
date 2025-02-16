import { ServiceBase } from '@utils';
import { singleton } from 'tsyringe';

@singleton()
export class ControlsService extends ServiceBase {
	private _allControlActionsState = true;

	public get allControlActionsState() {
		return this._allControlActionsState;
	}
	public set allControlActionsState(value) {
		this._allControlActionsState = value;
		if (!value) {
			this.startDisableAllControlActions();
		}
	}

	private async startDisableAllControlActions() {
		if (!this.allControlActionsState) {
			mp.game.controls.disableAllControlActions(0);
			await mp.game.waitAsync(5);
			this.startDisableAllControlActions();
		}
	}
}
