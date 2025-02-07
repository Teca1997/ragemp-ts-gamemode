import { CEF, Client, Server } from '@shared';

import { ControlsService } from '../controls';
import { UIService } from '../ui';
import { AuthCameraPair } from './AuthCameraPair';

export class AuthService {
	private static _instance: AuthService = new AuthService();

	private authCameraChain: AuthCameraPair = AuthCameraPair.setupAuthCameras();

	public static get instance(): AuthService {
		return AuthService._instance;
	}

	private constructor() {
		mp.events.addProc(Client.Events.Auth.Login, this.login.bind(this));
		mp.events.add(Client.Events.Auth.Logout, this.logout.bind(this));
		mp.events.addProc(Client.Events.Auth.Register, this.register.bind(this));
		mp.events.add(Client.Events.Auth.StartAuthCameras, this.startAuthCameras.bind(this));
		mp.events.add(Client.Events.Auth.StopAuthCameras, this.stopAuthCameras.bind(this));
		mp.events.add('playerReady', this.playerReady.bind(this));
		mp.console.logInfo(`[INFO] Auth service started...`);
	}

	private startAuthCameras() {
		this.authCameraChain.startCameraLoop();
	}

	private stopAuthCameras() {
		this.authCameraChain.stopCameraLoop();
	}

	private playerReady() {
		this.startAuthCameras();
		mp.gui.cursor.show(false, true);
	}

	private async logout() {
		this.playerReady();
		ControlsService.instance.allControlActionsState = false;
		UIService.instance.setPage(CEF.Pages.Auth);
		UIService.instance.info('Logged out');
		mp.events.callRemote(Server.Events.Auth.Logout);
	}

	private async login(values: string) {
		return await mp.events.callRemoteProc(Server.Events.Auth.Login, values);
	}

	private async register(values: string) {
		return await mp.events.callRemoteProc(Server.Events.Auth.Register, values);
	}
}
