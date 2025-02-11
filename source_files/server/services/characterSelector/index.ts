import { CharacterClothingItem, CharacterHeadOverlay, Server } from '@shared';

import { yellow } from 'colorette';

export class CharacterSelector {
	private static _instance: CharacterSelector = new CharacterSelector();

	private freemodeCharacters = [mp.joaat('mp_f_freemode_01'), mp.joaat('mp_m_freemode_01')];

	public static get instance(): CharacterSelector {
		return CharacterSelector._instance;
	}

	private constructor() {
		mp.events.addProc(Server.Events.CharaterSelector.Play, this.play.bind(this));
		mp.events.add('setoverlay', this.setHeadOverlay.bind(this));
		console.log(`${yellow('[INFO]')} Character selector service started...`);
	}

	private setHeadOverlay(player: PlayerMp, data: string) {
		const {
			index,
			value,
			opacity,
			color = 0,
			secondColor = 0
		}: CharacterHeadOverlay = JSON.parse(data);
		player.setHeadOverlay(index, [value, opacity, color, secondColor]);
	}

	private async play(player: PlayerMp, characterIndex: number) {
		this.applyCharacter(player, characterIndex);
		const { x, y, z } = player.ownData.account?.characters![characterIndex].position.location!;
		player.position = new mp.Vector3(x, y, z);
		player.dimension = player.ownData.account?.characters![characterIndex].position.dimension!;
		player.heading = player.ownData.account?.characters![characterIndex].position.heading!;
		return true;
	}

	private async applyCharacter(player: PlayerMp, characterIndex: number) {
		if (
			player.ownData.account == undefined ||
			player.ownData.account == null ||
			player.ownData.account.characters == null
		)
			return;
		const { gender, parents, hairColors, clothes, faceFeatures, eyeColor, headOverlays } =
			player.ownData.account.characters[characterIndex];
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
			eyeColor,
			hairColors.color,
			hairColors.highlightColor,
			faceFeatures
		);

		headOverlays.forEach((element) => {
			player.setHeadOverlay(element.index, [
				element.value == 0 ? 255 : element.index,
				element.opacity,
				element.color ? element.color : 0,
				element.secondColor ? element.secondColor : 0
			]);
		});

		clothes.forEach((element: CharacterClothingItem) => {
			player.setClothes(element.id, element.drawable, element.texture, element.palette);
		});
	}
}
