import {
	CharacterClothingItem,
	CharacterData,
	CharacterHeadOverlay,
	CharacterParents
} from '../types';

export const default_male_clothes: CharacterClothingItem[] = [
	{
		id: 1,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 2,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 3,
		drawable: 15,
		texture: 0,
		palette: 2
	},
	{
		id: 4,
		drawable: 43,
		texture: 0,
		palette: 2
	},
	{
		id: 5,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 6,
		drawable: 49,
		texture: 0,
		palette: 2
	},
	{
		id: 7,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 8,
		drawable: 15,
		texture: 0,
		palette: 2
	},
	{
		id: 9,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 10,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 11,
		drawable: 22,
		texture: 0,
		palette: 2
	}
];

export const default_female_clothes: CharacterClothingItem[] = [
	{
		id: 1,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 3,
		drawable: 15,
		texture: 0,
		palette: 2
	},
	{
		id: 4,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 5,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 6,
		drawable: 49,
		texture: 0,
		palette: 2
	},
	{
		id: 7,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 8,
		drawable: 34,
		texture: 0,
		palette: 2
	},
	{
		id: 9,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 10,
		drawable: 0,
		texture: 0,
		palette: 2
	},
	{
		id: 11,
		drawable: 23,
		texture: 0,
		palette: 2
	}
];

export const defaultParents: CharacterParents = {
	father: 0,
	mother: 0,
	similarity: 0.5,
	skinSimilarity: 0.5
};

export const defaultCharcterPositon = {
	location: {
		x: -241.94448852539062,
		y: 6325.61865234375,
		z: 32.426177978515625
	},
	heading: -144.61412048339844,
	dimension: 0
};

export const defaultFaceFeatures: number[] = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

export const defaultHeadOverlays: CharacterHeadOverlay[] = [
	{ index: 0, value: 255, opacity: 0 },
	{ index: 1, value: 255, opacity: 0, color: 0 },
	{ index: 2, value: 255, opacity: 0, color: 0 },
	{ index: 3, value: 255, opacity: 0 },
	{ index: 4, value: 255, opacity: 0 },
	{ index: 5, value: 255, opacity: 0, color: 0 },
	{ index: 6, value: 255, opacity: 0 },
	{ index: 7, value: 255, opacity: 0 },
	{ index: 8, value: 255, opacity: 0, color: 0 },
	{ index: 9, value: 255, opacity: 0 },
	{ index: 10, value: 255, opacity: 0, color: 0 },
	{ index: 11, value: 255, opacity: 0 },
	{ index: 12, value: 255, opacity: 0 }
];

export const defaultHairColors = {
	color: 0,
	highlightColor: 0
};

export const defaultMaleCharacter: CharacterData = {
	gender: 1,
	firstName: '',
	lastName: '',
	inventory: {},
	position: defaultCharcterPositon,
	parents: defaultParents,
	faceFeatures: defaultFaceFeatures,
	hairColors: defaultHairColors,
	eyeColor: 0,
	headOverlays: defaultHeadOverlays,
	clothes: default_male_clothes
};

export const defaultFemaleCharacter: CharacterData = {
	gender: 0,
	firstName: '',
	lastName: '',
	inventory: {},
	parents: defaultParents,
	faceFeatures: defaultFaceFeatures,
	position: defaultCharcterPositon,
	hairColors: defaultHairColors,
	eyeColor: 0,
	headOverlays: defaultHeadOverlays,
	clothes: default_female_clothes
};
