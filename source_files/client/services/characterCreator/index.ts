import { CEF, Client, Config, defaultFemaleCharacter, defaultMaleCharacter } from '@shared';
import { PlayerService } from '../player';
import { UIService } from '../ui';

export class CharacterCreator {
	private character = defaultMaleCharacter;

	private creatorCamera: CameraMp;

	private static _instance: CharacterCreator = new CharacterCreator();

	private constructor() {
		mp.console.logInfo(`[INFO] Character creator started....`);
		mp.events.add(Client.Events.CharacterCreator.Start, this.start.bind(this));
		mp.events.add(Client.Events.CharacterCreator.UpdateGander, this.updateGender.bind(this));
		mp.events.add(Client.Events.CharacterCreator.UpdateParents, this.updateParents.bind(this));
		mp.events.add(
			Client.Events.CharacterCreator.UpdateFaceFeature,
			this.updateFaceFeature.bind(this)
		);
		mp.events.add(
			Client.Events.CharacterCreator.UpdateHeadOverlay,
			this.updateHeadOverlay.bind(this)
		);

		mp.events.addProc(
			Client.Events.CharacterCreator.GetNumHeadOverlayValues,
			(overlayId: number) => {
				return mp.game.ped.getNumHeadOverlayValues(overlayId);
			}
		);
		mp.events.add(Client.Events.CharacterCreator.Save, this.save.bind(this));
	}

	public static get instance(): CharacterCreator {
		return CharacterCreator._instance;
	}

	private updateFaceFeature(data: string) {
		const { name, value } = JSON.parse(data);
		mp.players.local.setFaceFeature(name >>> 0, value);
	}

	private updateHeadOverlay(data: string) {
		const { index, value, opacity, firstColor, secondColor } = JSON.parse(data);
		mp.players.local.setHeadOverlay(index, value, opacity, firstColor, secondColor);
	}

	private updateGender(gender: number) {
		this.character.gender = gender;
		PlayerService.instance.applyCharacter(
			gender == 0 ? defaultFemaleCharacter : defaultMaleCharacter
		);
	}

	private updateParents(data: string) {
		this.character.parents = JSON.parse(data);
		PlayerService.instance.setParents(JSON.parse(data));
	}

	private async save() {
		mp.console.logInfo('data ' + JSON.stringify(this.character));
		return;
	}

	start() {
		UIService.instance.setCharacterData(defaultMaleCharacter);
		UIService.instance.setPage(CEF.Pages.CharacterCreator);
		mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
		mp.players.local.position = new mp.Vector3(
			Config.CharacterSelector.PlayerPosition.x,
			Config.CharacterSelector.PlayerPosition.y,
			Config.CharacterSelector.PlayerPosition.z
		);
		mp.players.local.setHeading(Config.CharacterSelector.PlayerHeading);
		const headingInRadians = (mp.players.local.getHeading() + 90) * (Math.PI / 180);
		const headPosition = mp.players.local.getBoneCoords(RageEnums.Ped.Bones.SKEL_HEAD, 0, 0, 0);
		const cameraPosition = new mp.Vector3(
			Math.cos(headingInRadians) * 1 + headPosition.x,
			Math.sin(headingInRadians) * 1 + headPosition.y,
			headPosition.z
		);

		this.creatorCamera = mp.cameras.new(
			'selectorCamera',
			cameraPosition,
			new mp.Vector3(0, 0, 0),
			40
		);
		this.creatorCamera.pointAtCoord(headPosition.x, headPosition.y, headPosition.z);
		mp.game.cam.renderScriptCams(true, true, 0, true, false, 0);

		PlayerService.instance.applyCharacter(defaultMaleCharacter);
		mp.console.logInfo('started character creator');
	}
}
