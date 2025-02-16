import { CharacterClothingItem, CharacterHair, CharacterParents, Config, defaultMaleCharacter, Server } from '@shared';
import { injectable } from 'tsyringe';

@injectable()
export class CharacterCreatorService {
	private character = defaultMaleCharacter;

	private creatorCamera: CameraMp;

	updateHairColor({ color, highlightColor }: CharacterHair) {
		this.character.hairColors = { color, highlightColor };
		mp.players.local.setHairColor(color, highlightColor);
	}

	updateComponentVariation({ id, drawable, texture, palette }: CharacterClothingItem) {
		this.character.clothes.forEach((item) => {
			if (item.id == id) {
				item.drawable = drawable;
				item.texture = texture;
				item.palette = palette;
				mp.players.local.setComponentVariation(id, drawable, texture, palette);
			}
		});
	}

	updateFaceFeature({ name, value }: { name: number; value: number }) {
		this.character.faceFeatures[name] = value;
		mp.players.local.setFaceFeature(name >>> 0, value);
	}

	updateHeadOverlay({ valueName, index, value }: { valueName: string; index: number; value: number }) {
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

	updateFirstName(firstName: string) {
		this.character.firstName = firstName;
	}

	updateLastName(lastName: string) {
		this.character.lastName = lastName;
	}

	updateGender(gender: number) {
		this.character.gender = gender;
	}

	updateParents(parents: CharacterParents) {
		this.character.parents = parents;
	}

	async save() {
		return await mp.events.callRemoteProc(Server.Events.CharacterCreator.Save, JSON.stringify(this.character));
	}

	start() {
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
	}
}
