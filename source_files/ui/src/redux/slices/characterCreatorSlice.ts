import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultMaleCharacter, Types } from '@shared';

type CharacterCreatorData = {
	creatorData: Types.CharacterData;
};

const initialState: CharacterCreatorData = {
	creatorData: defaultMaleCharacter
};

const characterCreatorSlice = createSlice({
	name: 'characterCreator',
	initialState,
	reducers: {
		setCharacterCreatorData: (
			state: CharacterCreatorData,
			action: PayloadAction<Types.CharacterData>
		) => {
			state.creatorData = action.payload;
		},
		setGender: (state: CharacterCreatorData, action: PayloadAction<number>) => {
			state.creatorData.gender = action.payload;
		},
		setParents: (
			state: CharacterCreatorData,
			action: PayloadAction<Types.CharacterParents>
		) => {
			state.creatorData.parents = action.payload;
		},
		setFaceFeature: (
			state: CharacterCreatorData,
			action: PayloadAction<{ index: number; value: number }>
		) => {
			state.creatorData.faceFeatures[action.payload.index] = action.payload.value;
		},
		setHeadOverlay: (
			state: CharacterCreatorData,
			action: PayloadAction<{ index: number; value: number; valueName: string }>
		) => {
			state.creatorData.headOverlays.forEach(
				(overlay) =>
					overlay.index == action.payload.index &&
					overlay[action.payload.valueName as keyof typeof overlay]
			);
			console.log('Set state');
		}
	}
});

export default characterCreatorSlice.reducer;
export const characterCreatorActions = characterCreatorSlice.actions;
