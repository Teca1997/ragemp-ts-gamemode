import { CEF, Client, Server, Types, Variables } from '@shared';

import { ClientConfig } from '../../config';
import { ControlsService } from '../controls';
import { UIService } from '../ui';

export class CharacterSelector {
	private static _instance: CharacterSelector = new CharacterSelector();
	private freemodeCharacters = [
		mp.game.joaat('mp_m_freemode_01'),
		mp.game.joaat('mp_f_freemode_01')
	];

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
		mp.console.logInfo(`[INFO] Character selector service started...`);
	}

	private async play(characterIndex: number) {
		const result = await mp.events.callRemoteProc(
			Server.Events.CharaterSelector.Play,
			characterIndex
		);
		mp.console.logInfo(JSON.stringify(result));
		ControlsService.instance.allControlActionsState = true;
		mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
		UIService.instance.setPage('');
	}

	private applyCharacter(index: number) {
		const account: Types.AccountData | null = mp.players.local.getVariable(
			Variables.Player.Account
		);

		if (account == null || account.characters == null) return;
		if (account.characters.length == 0) return;
		a.a;
		const { gender, parents, hair, clothes, faceFeatures, colors, headOverlay } =
			account.characters[index];
		//set player model clientside
		mp.players.local.model = this.freemodeCharacters[gender];
		//set parents clientside
		mp.players.local.setHeadBlendData(
			// shape
			parents.mother >>> 0,
			parents.father >>> 0,
			0,
			// skin
			parents.mother >>> 0,
			parents.father >>> 0,
			0,
			// mixes
			parents.similarity >>> 0,
			parents.skinSimilarity >>> 0,
			0.0,
			false
		);
		//set face features
		faceFeatures.forEach((feature, index) => {
			mp.players.local.setFaceFeature(index, feature);
		});

		//set appearance
		headOverlay.forEach((element) => {
			mp.players.local.setHeadOverlay(
				element.overlayId,
				element.index == 0 ? 255 : element.index,
				element.opacity,
				element.firstColor,
				element.secondColor
			);
		});

		//set clothes
		clothes.forEach((element) => {
			mp.players.local.setComponentVariation(
				element.id,
				element.drawable,
				element.texture,
				element.palette
			);
		});
		mp.players.local.setComponentVariation(2, hair.hair, 0, 2);
		//set colors
		mp.players.local.setHairColor(hair.color, hair.highlightColor);
		mp.players.local.setEyeColor(colors.eyeColor);
		/* 		mp.players.local.setHeadOverlayColor(1, 1, colors.beardColor, 0);
		mp.players.local.setHeadOverlayColor(2, 1, colors.eyebrowColor, 0);
		mp.players.local.setHeadOverlayColor(5, 2, colors.blushColor, 0);
		mp.players.local.setHeadOverlayColor(8, 2, colors.lipstickColor, 0);
		mp.players.local.setHeadOverlayColor(10, 1, colors.chestHairColor, 0); */
	}

	private async start() {
		const selectorCamera = mp.cameras.new(
			'selectorCamera',
			ClientConfig.Selector.cameraPosition,
			new mp.Vector3(0, 0, 0),
			40
		);
		selectorCamera.pointAtCoord(
			ClientConfig.Selector.cameraPointAt.x,
			ClientConfig.Selector.cameraPointAt.y,
			ClientConfig.Selector.cameraPointAt.z
		);
		mp.game.cam.renderScriptCams(true, true, 0, true, false, 0);
		mp.events.callRemote(Server.Events.CharaterSelector.Start);
		UIService.instance.setAccountData(JSON.stringify(mp.players.local.getVariable('account')));
		UIService.instance.setPage(CEF.Pages.CharacterSelector);

		this.applyCharacter(0);
	}
}
