import { Injectable } from '@nestjs/common';
import { CharacterClothingItem } from '@shared';
import { IPlayer } from '../../utils/stubs';

@Injectable()
export class CharacterSelectorService {
	private freemodeCharacters = [mp.joaat('mp_f_freemode_01'), mp.joaat('mp_m_freemode_01')];

	constructor() {}

	public play(player: IPlayer, characterIndex: number) {
		this.applyCharacter(player, characterIndex);
		this.spawnCharacter(player, characterIndex);
		return true;
	}

	private spawnCharacter(player: IPlayer, characterIndex: number) {
		const { x, y, z } = player.ownData.account?.characters![characterIndex].position.location!;
		player.position = new mp.Vector3(x, y, z);
		player.dimension = player.ownData.account?.characters![characterIndex].position.dimension!;
		player.heading = player.ownData.account?.characters![characterIndex].position.heading!;
	}

	private async applyCharacter(player: IPlayer, characterIndex: number) {
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
