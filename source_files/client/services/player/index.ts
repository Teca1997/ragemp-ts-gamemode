import { Types } from '@shared';

export class PlayerService {
	private static _instance: PlayerService = new PlayerService();

	private freemodeCharacters = [
		mp.game.joaat('mp_f_freemode_01'),
		mp.game.joaat('mp_m_freemode_01')
	];

	private constructor() {
		mp.console.logInfo(`[INFO] Player service started...`);
	}

	public static get instance(): PlayerService {
		return PlayerService._instance;
	}

	setGender(gender: number) {
		mp.players.local.model = this.freemodeCharacters[gender];
	}

	setParents({ mother, father, similarity, skinSimilarity }: Types.CharacterParents) {
		mp.players.local.setHeadBlendData(
			// shape
			mother >>> 0,
			father >>> 0,
			0,
			// skin
			mother >>> 0,
			father >>> 0,
			0,
			// mixes
			similarity,
			skinSimilarity,
			0.0,
			false
		);
	}

	public applyCharacter({
		gender,
		parents,
		hairColors,
		clothes,
		faceFeatures,
		colors,
		headOverlays
	}: Types.CharacterData) {
		//set player model clientside
		this.setGender(gender);
		//set parents clientside
		this.setParents(parents);
		//set face features
		faceFeatures.forEach((feature, index) => {
			mp.players.local.setFaceFeature(index, feature);
		});

		headOverlays.forEach(({ index, value, opacity, firstColor, secondColor }) => {
			mp.players.local.setHeadOverlay(index, value, opacity, firstColor, secondColor);
		});

		clothes.forEach(({ id, drawable, texture, palette }: Types.CharacterClothingItem) => {
			mp.players.local.setComponentVariation(id, drawable, texture, palette);
		});

		//mp.players.local.setHairColor(hairColors.color, hairColors.highlightColor);
		//mp.players.local.setEyeColor(colors.eyeColor);
	}
}
