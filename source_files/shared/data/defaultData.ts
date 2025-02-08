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

export const defaultMaleCharacter: CharacterData = {
	gender: 1,
	firstName: '',
	lastName: '',
	inventory: {},
	position: {
		location: { x: 0, y: 0, z: 0 },
		heading: 0,
		dimension: 0
	},
	parents: defaultParents,
	faceFeatures: defaultFaceFeatures,
	hairColors: {
		color: 0,
		highlightColor: 0
	},
	colors: {
		eyebrowColor: 0,
		beardColor: 0,
		eyeColor: 0,
		blushColor: 0,
		lipstickColor: 0,
		chestHairColor: 0
	},
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
	position: {
		location: { x: 0, y: 0, z: 0 },
		heading: 0,
		dimension: 0
	},
	hairColors: {
		color: 0,
		highlightColor: 0
	},
	colors: {
		eyebrowColor: 0,
		beardColor: 0,
		eyeColor: 0,
		blushColor: 0,
		lipstickColor: 0,
		chestHairColor: 0
	},
	headOverlays: defaultHeadOverlays,
	clothes: default_female_clothes
};
