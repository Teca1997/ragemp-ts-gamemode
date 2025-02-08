import { Character } from '../../server/db/entities/Character';
import { default_female_clothes, default_male_clothes, defaultHeadOverlays } from './defaultData';

export const default_characters: Character[] = [
	{
		firstName: 'John',
		lastName: 'Doe',
		position: {
			location: {
				x: -241.94448852539062,
				y: 6325.61865234375,
				z: 32.426177978515625
			},
			heading: -144.61412048339844,
			dimension: 0
		},
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
	},
	{
		firstName: 'Jane',
		lastName: 'Doe',
		position: {
			location: {
				x: -241.94448852539062,
				y: 6325.61865234375,
				z: 32.426177978515625
			},
			heading: -144.61412048339844,
			dimension: 0
		},
		inventory: {},
		account: 2,
		gender: 0,
		parents: {
			father: 1,
			mother: 1,
			skinSimilarity: 1,
			similarity: 1
		},
		faceFeatures: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
	},
	{
		firstName: 'Jane',
		lastName: 'Doe',
		position: {
			location: {
				x: -241.94448852539062,
				y: 6325.61865234375,
				z: 32.426177978515625
			},
			heading: -144.61412048339844,
			dimension: 0
		},
		inventory: {},
		account: 2,
		gender: 0,
		parents: {
			father: 1,
			mother: 1,
			skinSimilarity: 1,
			similarity: 1
		},
		faceFeatures: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
	}
];
