import {
	default_female_clothes,
	default_male_clothes
} from '../../../../shared/defaultChacterClothes';

import { Character } from '../../entities/Character';

type Vector3 = {
	x: number;
	y: number;
	z: number;
};

export const default_characters: Character[] = [
	{
		firstname: 'John',
		lastname: 'Doe',
		position: {
			location: new mp.Vector3(-241.94448852539062, 6325.61865234375, 32.426177978515625),
			heading: -144.61412048339844,
			dimension: 0
		},
		dateOfBirth: '1990-01-01',
		nationality: 'n/a',
		story: 'Lorem ipsum',
		inventory: {},
		account: 1,
		gender: 1,
		parents: {
			father: 1,
			mother: 1,
			skinSimilarity: 1,
			similarity: 1
		},
		faceFeatures: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		hair: {
			hair: 0,
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
		headOverlay: [
			{ overlayId: 0, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 1, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 2, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 3, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 4, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 5, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 6, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 7, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 8, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 9, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 10, index: 255, opacity: 100, firstColor: 0, secondColor: 0 }
		],
		clothes: default_male_clothes
	},
	{
		firstname: 'Jane',
		lastname: 'Doe',
		position: {
			location: new mp.Vector3(-241.94448852539062, 6325.61865234375, 32.426177978515625),
			heading: -144.61412048339844,
			dimension: 0
		},
		dateOfBirth: '1990-01-01',
		nationality: 'n/a',
		story: 'Lorem ipsum',
		inventory: {},
		account: 2,
		gender: 1,
		parents: {
			father: 1,
			mother: 1,
			skinSimilarity: 1,
			similarity: 1
		},
		faceFeatures: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		hair: {
			hair: 0,
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
		headOverlay: [
			{ overlayId: 0, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 1, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 2, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 3, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 4, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 5, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 6, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 7, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 8, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 9, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 10, index: 255, opacity: 100, firstColor: 0, secondColor: 0 }
		],
		clothes: default_female_clothes
	},
	{
		firstname: 'Jane',
		lastname: 'Doe',
		position: {
			location: new mp.Vector3(-241.94448852539062, 6325.61865234375, 32.426177978515625),
			heading: -144.61412048339844,
			dimension: 0
		},
		dateOfBirth: '1990-01-01',
		nationality: 'n/a',
		story: 'Lorem ipsum',
		inventory: {},
		account: 2,
		gender: 1,
		parents: {
			father: 1,
			mother: 1,
			skinSimilarity: 1,
			similarity: 1
		},
		faceFeatures: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		hair: {
			hair: 0,
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
		headOverlay: [
			{ overlayId: 0, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 1, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 2, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 3, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 4, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 5, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 6, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 7, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 8, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 9, index: 255, opacity: 100, firstColor: 0, secondColor: 0 },
			{ overlayId: 10, index: 255, opacity: 100, firstColor: 0, secondColor: 0 }
		],
		clothes: default_female_clothes
	}
];
