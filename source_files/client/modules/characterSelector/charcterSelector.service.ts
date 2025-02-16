import { CEF, Config, Server } from '@shared';
import { ControlsService } from 'modules/controls/controls.service';
import { PlayerService } from 'modules/player/player.service';
import { UIService } from 'modules/ui/ui.service';
import { injectable } from 'tsyringe';

@injectable()
export class CharacterSelectorService {
	private selectorCamera: CameraMp;

	constructor(
		private playerService: PlayerService,
		private controlsService: ControlsService,
		private uiService: UIService
	) {}

	private applyCharacter(index: number) {
		this.playerService.applyCharacter(mp.players.local.ownData.account!.characters![index]);
	}

	private play(characterIndex: number) {
		mp.events.callRemote(Server.Events.CharaterSelector.Play, characterIndex);
		this.controlsService.allControlActionsState = true;
		this.uiService.showGameUI(true);
		mp.gui.chat.show(true);
		mp.gui.cursor.show(false, false);
		mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
		this.uiService.setPage(CEF.Pages.Hud);
	}

	start() {
		if (mp.players.local.ownData.account!.characters!.length === 0) {
			mp.players.local.alpha = 0;
			return;
		}
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
	}
}
