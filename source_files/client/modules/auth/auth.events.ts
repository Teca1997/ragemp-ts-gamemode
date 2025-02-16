import { CEF, Client, Server } from '@shared';
import { EventsBase, MPEvent } from '@utils';
import { ControlsService } from 'modules/controls/controls.service';
import { UIService } from 'modules/ui/ui.service';
import { singleton } from 'tsyringe';
import { AuthService } from './auth.service';

@singleton()
export class AuthEvents extends EventsBase {
	constructor(
		private readonly authService: AuthService,
		private readonly controlsService: ControlsService,
		private readonly uiService: UIService
	) {
		super();
	}

	@MPEvent({})
	private playerReady() {
		this.authService!.startAuthCameras();
		this.controlsService!.allControlActionsState = false;
		mp.gui.cursor.show(true, true);
	}

	@MPEvent({ name: Client.Events.Auth.Logout })
	private async logout() {
		this.playerReady();
		this.controlsService!.allControlActionsState = false;
		this.uiService!.setPage(CEF.Pages.Auth);
		this.uiService!.info('Logged out');
		mp.events.callRemote(Server.Events.Auth.Logout);
	}

	@MPEvent({ name: Client.Events.Auth.Login, proc: true })
	private async login(data: string) {
		return await mp.events.callRemoteProc(Server.Events.Auth.Login, data);
	}

	@MPEvent({ name: Client.Events.Auth.Register, proc: true })
	private async register(data: string) {
		return await mp.events.callRemoteProc(Server.Events.Auth.Register, data);
	}

	@MPEvent({ name: Client.Events.Auth.StartAuthCameras })
	private startAuthCameras() {
		this.authService!.startAuthCameras();
	}
	@MPEvent({ name: Client.Events.Auth.StopAuthCameras })
	private stopAuthCameras() {
		this.authService!.stopAuthCameras();
	}
}
