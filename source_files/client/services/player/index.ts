import { CharacterClothingItem, CharacterData, CharacterParents, Client } from '@shared';

export class PlayerService {
	private static _instance: PlayerService = new PlayerService();

	private freemodeCharacters = [
		mp.game.joaat('mp_f_freemode_01'),
		mp.game.joaat('mp_m_freemode_01')
	];

	private constructor() {
		mp.events.addProc(
			Client.Events.PlayerService.GetNumOfComVarPermutions,
			this.getNumOfComVarPermutions.bind(this)
		);

		mp.events.addProc(
			Client.Events.PlayerService.GetNumHeadOverlayValues,
			(overlayId: number) => mp.game.ped.getNumHeadOverlayValues(overlayId)
		);

		mp.console.logInfo(`[INFO] Player service started...`);
	}

	public static get instance(): PlayerService {
		return PlayerService._instance;
	}

	private getNumOfComVarPermutions(componentId: number) {
		const numOfComDrawables = mp.players.local.getNumberOfDrawableVariations(componentId);
		const numOfTexturesPerDrawable = [];
		for (let index = 0; index < numOfComDrawables; index++) {
			numOfTexturesPerDrawable.push(
				mp.players.local.getNumberOfTextureVariations(componentId, index)
			);
		}

		return JSON.stringify(numOfTexturesPerDrawable);
	}

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
