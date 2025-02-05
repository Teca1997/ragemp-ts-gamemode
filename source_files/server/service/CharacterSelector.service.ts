import { CharacterClothingItem, Server } from '@shared';

import { yellow } from 'colorette';
import { ServerConfig } from '../config';

export class CharacterSelector {
	private static _instance: CharacterSelector = new CharacterSelector();

	private freemodeCharacters = [mp.joaat('mp_m_freemode_01'), mp.joaat('mp_f_freemode_01')];

	public static get instance(): CharacterSelector {
		return CharacterSelector._instance;
	}

	private constructor() {
		mp.events.add(Server.Events.CharaterSelector.Start, this.start.bind(this));
		mp.events.addProc(Server.Events.CharaterSelector.Play, this.play.bind(this));
		console.log(`${yellow('[INFO]')} Character selector service started...`);
	}

	private play(player: PlayerMp, characterIndex: number) {
		if (
			player.account == undefined ||
			player.account == null ||
			player.account.characters == null
		)
			return;
		this.applyCharacter(player, characterIndex);
		player.position = player.account!.characters[characterIndex].position.location;
		player.dimension = player.account!.characters[characterIndex].position.dimension;
		player.heading = player.account!.characters[characterIndex].position.heading;
		return;
	}

	private async applyCharacter(player: PlayerMp, characterIndex: number) {
		if (
			player.account == undefined ||
			player.account == null ||
			player.account.characters == null
		)
			return;
		const { gender, parents, hair, clothes, faceFeatures, colors, headOverlay } =
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
			hair.color,
			hair.highlightColor,
			faceFeatures
		);

		headOverlay.forEach((element) => {
			player.setHeadOverlay(element.overlayId, [
				element.index == 0 ? 255 : element.index,
				element.opacity,
				element.firstColor,
				element.secondColor
			]);
		});

		player.setClothes(2, hair.hair, 0, 2);
		clothes.forEach((element: CharacterClothingItem) => {
			player.setClothes(element.id, element.drawable, element.texture, element.palette);
		});
	}

	private start(player: PlayerMp) {
		player.position = ServerConfig.Selector.playerPosition;
		player.heading = ServerConfig.Selector.playerHeading;
	}
}
