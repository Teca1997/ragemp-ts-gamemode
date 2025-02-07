import { Server, Types } from '@shared';

import { yellow } from 'colorette';

export class CharacterSelector {
	private static _instance: CharacterSelector = new CharacterSelector();

	private freemodeCharacters = [mp.joaat('mp_f_freemode_01'), mp.joaat('mp_m_freemode_01')];

	public static get instance(): CharacterSelector {
		return CharacterSelector._instance;
	}

	private constructor() {
		mp.events.addProc(Server.Events.CharaterSelector.Play, this.play.bind(this));
		console.log(`${yellow('[INFO]')} Character selector service started...`);
	}

	private async play(player: PlayerMp, characterIndex: number) {
		if (
			player.account == undefined ||
			player.account == null ||
			player.account.characters == null
		)
			return;
		this.applyCharacter(player, characterIndex);
		const { x, y, z } = player.account!.characters[characterIndex].position.location;
		player.position = new mp.Vector3(x, y, z);
		player.dimension = player.account!.characters[characterIndex].position.dimension;
		player.heading = player.account!.characters[characterIndex].position.heading;
		return true;
	}

	private async applyCharacter(player: PlayerMp, characterIndex: number) {
		if (
			player.account == undefined ||
			player.account == null ||
			player.account.characters == null
		)
			return;
		const { gender, parents, hairColors, clothes, faceFeatures, colors, headOverlays } =
			player.account.characters[characterIndex];

		player.model = this.freemodeCharacters[gender];
		player.setCustomization(
			gender == 0 ? false : true,
			parents.mother,
			parents.father,
			0,
			parents.mother,
			parents.father,
			0,
			parents.similarity,
			parents.skinSimilarity,
			0.0,
			colors.eyeColor,
			hairColors.color,
			hairColors.highlightColor,
			faceFeatures
		);

		headOverlays.forEach((element) => {
			player.setHeadOverlay(element.index, [
				element.value == 0 ? 255 : element.index,
				element.opacity,
				element.firstColor,
				element.secondColor
			]);
		});

		clothes.forEach((element: Types.CharacterClothingItem) => {
			player.setClothes(element.id, element.drawable, element.texture, element.palette);
		});
	}
}
