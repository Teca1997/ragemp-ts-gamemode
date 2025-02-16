import { CharacterClothingItem, CharacterData, CharacterParents } from '@shared';
import { injectable } from 'tsyringe';

@injectable()
export class PlayerService {
	private freemodeCharacters = [mp.game.joaat('mp_f_freemode_01'), mp.game.joaat('mp_m_freemode_01')];

	public setGender(gender: number) {
		mp.players.local.model = this.freemodeCharacters[gender];
	}

	public setParents({ mother, father, similarity, skinSimilarity }: CharacterParents) {
		mp.players.local.setHeadBlendData(
			mother >>> 0,
			father >>> 0,
			0,
			mother >>> 0,
			father >>> 0,
			0,
			similarity,
			skinSimilarity,
			0.0,
			false
		);
	}

	public applyCharacter({
		gender,
		parents,
		faceFeatures,
		headOverlays,
		clothes,
		hairColors,
		eyeColor
	}: CharacterData) {
		this.setGender(gender);
		this.setParents(parents);

		faceFeatures.map((feature, index) => {
			mp.players.local.setFaceFeature(index, feature);
		});

		headOverlays.forEach(({ index, value, opacity, color = 0, secondColor = 0 }) => {
			mp.players.local.setHeadOverlay(index, value, opacity, color, secondColor);
		});

		clothes.forEach(({ id, drawable, texture, palette }: CharacterClothingItem) => {
			mp.players.local.setComponentVariation(id, drawable, texture, palette);
		});

		mp.players.local.setHairColor(hairColors.color, hairColors.highlightColor);
		mp.players.local.setEyeColor(eyeColor);
	}
}
