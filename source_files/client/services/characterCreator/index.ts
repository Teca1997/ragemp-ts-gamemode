import {
	CEF,
	CharacterClothingItem,
	CharacterHair,
	Client,
	Config,
	defaultFemaleCharacter,
	defaultMaleCharacter,
	Server
} from '@shared';
import { PlayerService } from '../player';
import { UIService } from '../ui';

export class CharacterCreator {
	private character = defaultMaleCharacter;

	private creatorCamera: CameraMp;

	private static _instance: CharacterCreator = new CharacterCreator();

	private constructor() {
		mp.console.logInfo(`[INFO] Character creator started...`);
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
		mp.events.addProc(Client.Events.CharacterCreator.Save, this.save.bind(this));

		mp.events.add(
			Client.Events.CharacterCreator.UpdateComponentVariation,
			this.updateComponentVariation.bind(this)
		);
		mp.events.add(
			Client.Events.CharacterCreator.UpdateHairColor,
			this.updateHairColor.bind(this)
		);
		mp.events.add(
			Client.Events.CharacterCreator.UpdateFirstName,
			this.updateFirstName.bind(this)
		);
		mp.events.add(
			Client.Events.CharacterCreator.UpdateLastName,
			this.updateLastName.bind(this)
		);
	}

	public static get instance(): CharacterCreator {
		return CharacterCreator._instance;
	}

	updateHairColor(data: string) {
		const { color, highlightColor }: CharacterHair = JSON.parse(data);
		mp.players.local.setHairColor(color, highlightColor);
	}

	private updateComponentVariation(data: string) {
		const { id, drawable, texture, palette }: CharacterClothingItem = JSON.parse(data);
		this.character.clothes.forEach((item) => {
			if (item.id == id) {
				item = { id, drawable, texture, palette };
				mp.players.local.setComponentVariation(id, drawable, texture, palette);
			}
		});
	}

	private updateFaceFeature(data: string) {
		const { name, value } = JSON.parse(data);
		this.character.faceFeatures[name] = value;
		mp.players.local.setFaceFeature(name >>> 0, value);
	}

	private updateHeadOverlay(data: string) {
		const { valueName, index, value } = JSON.parse(data);
		const overlay = this.character.headOverlays.forEach((overlay) => {
			if (overlay.index == index) {
				overlay[valueName as keyof typeof overlay] = value;
				mp.players.local.setHeadOverlay(
					overlay.index,
					overlay.value,
					overlay.opacity,
					overlay.color != undefined ? overlay.color : 0,
					overlay.secondColor != undefined ? overlay.secondColor : 0
				);
			}
		});
	}

	private updateFirstName(firstName: string) {
		this.character.firstName = firstName;
	}

	private updateLastName(lastName: string) {
		this.character.lastName = lastName;
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
		return await mp.events.callRemoteProc(
			Server.Events.CharacterCreator.Save,
			JSON.stringify(this.character)
		);
	}

	private start() {
		UIService.instance.setPage(CEF.Pages.CharacterCreator);
		mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
		mp.players.local.position = new mp.Vector3(
			Config.CharacterCreator.PlayerPosition.x,
			Config.CharacterCreator.PlayerPosition.y,
			Config.CharacterCreator.PlayerPosition.z
		);
		mp.players.local.setHeading(Config.CharacterCreator.PlayerHeading);
		const headingInRadians = (Config.CharacterCreator.PlayerHeading + 45) * (Math.PI / 180);
		const headPosition = mp.players.local.getBoneCoords(RageEnums.Ped.Bones.SKEL_HEAD, 0, 0, 0);
		const cameraPosition = new mp.Vector3(
			Math.sin(headingInRadians) * Config.CharacterCreator.CameraDistance + headPosition.x,
			Math.cos(headingInRadians) * Config.CharacterCreator.CameraDistance + headPosition.y,
			headPosition.z
		);

		this.creatorCamera = mp.cameras.new(
			'creatorCamera',
			cameraPosition,
			new mp.Vector3(0, 0, 0),
			Config.CharacterCreator.CameraFOV
		);
		this.creatorCamera.pointAtCoord(headPosition.x, headPosition.y, headPosition.z);

		mp.game.cam.renderScriptCams(true, true, 0, true, false, 0);
		this.creatorCamera.setActive(true);

		PlayerService.instance.applyCharacter(defaultMaleCharacter);
	}
}
