import { CEF, Client, Config, Server } from '@shared';

import { ControlsService } from '../controls';
import { PlayerService } from '../player';
import { UIService } from '../ui';

export class CharacterSelector {
	private static _instance: CharacterSelector = new CharacterSelector();

	private selectorCamera: CameraMp;

	public static get instance(): CharacterSelector {
		return CharacterSelector._instance;
	}

	private constructor() {
		mp.events.add(Client.Events.CharacterSelector.Start, this.start.bind(this));
		mp.events.add(
			Client.Events.CharacterSelector.ApplyCharacter,
			this.applyCharacter.bind(this)
		);
		mp.events.add(Client.Events.CharacterSelector.Play, this.play.bind(this));
		mp.console.logInfo(`[INFO] Character selector service started....`);
	}

	private applyCharacter(index: number) {
		PlayerService.instance.applyCharacter(mp.players.local.ownData.account!.characters![index]);
	}

	private async play(characterIndex: number) {
		await mp.events.callRemoteProc(Server.Events.CharaterSelector.Play, characterIndex);
		ControlsService.instance.allControlActionsState = true;
		UIService.instance.showGameUI(true);
		mp.gui.chat.show(true);
		mp.gui.cursor.show(false, false);
		mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
		UIService.instance.setPage(CEF.Pages.Hud);
	}

	private start() {
		mp.players.local.position = new mp.Vector3(
			Config.CharacterSelector.PlayerPosition.x,
			Config.CharacterSelector.PlayerPosition.y,
			Config.CharacterSelector.PlayerPosition.z
		);
		mp.players.local.setHeading(Config.CharacterSelector.PlayerHeading);
		const headingInRadians = (Config.CharacterSelector.PlayerHeading + 45) * (Math.PI / 180);
		const headPosition = mp.players.local.getBoneCoords(RageEnums.Ped.Bones.SKEL_HEAD, 0, 0, 0);
		const cameraPosition = new mp.Vector3(
			Math.sin(headingInRadians) * Config.CharacterSelector.CameraDistance + headPosition.x,
			Math.cos(headingInRadians) * Config.CharacterSelector.CameraDistance + headPosition.y,
			headPosition.z
		);

		this.selectorCamera = mp.cameras.new(
			'selectorCamera',
			cameraPosition,
			new mp.Vector3(0, 0, 0),
			Config.CharacterSelector.CameraFOV
		);
		this.selectorCamera.pointAtCoord(headPosition.x, headPosition.y, headPosition.z);
		mp.game.cam.renderScriptCams(true, true, 0, true, true, 0);
		this.applyCharacter(0);
		UIService.instance.setPage(CEF.Pages.CharacterSelector);
	}
}
