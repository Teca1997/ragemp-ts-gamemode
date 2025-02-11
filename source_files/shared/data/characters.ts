import { Character } from '../../server/db/entities/Character';
import {
	default_female_clothes,
	default_male_clothes,
	defaultCharcterPositon,
	defaultFaceFeatures,
	defaultHairColors,
	defaultHeadOverlays,
	defaultParents
} from './defaultData';

export const default_characters: Character[] = [
	{
		account: 1,
		gender: 0,
		firstName: 'Jane1',
		lastName: 'Doe1',
		inventory: {},
		parents: defaultParents,
		faceFeatures: defaultFaceFeatures,
		position: defaultCharcterPositon,
		hairColors: defaultHairColors,
		eyeColor: 0,
		headOverlays: defaultHeadOverlays,
		clothes: default_female_clothes
	},
	{
		account: 1,
		gender: 1,
		firstName: 'John1',
		lastName: 'Doe1',
		inventory: {},
		parents: defaultParents,
		faceFeatures: defaultFaceFeatures,
		position: defaultCharcterPositon,
		hairColors: defaultHairColors,
		eyeColor: 0,
		headOverlays: defaultHeadOverlays,
		clothes: default_male_clothes
	},
	{
		account: 1,
		gender: 0,
		firstName: 'Jane2',
		lastName: 'Doe2',
		inventory: {},
		parents: defaultParents,
		faceFeatures: defaultFaceFeatures,
		position: defaultCharcterPositon,
		hairColors: defaultHairColors,
		eyeColor: 0,
		headOverlays: defaultHeadOverlays,
		clothes: default_female_clothes
	},
	{
		account: 1,
		gender: 1,
		firstName: 'John2',
		lastName: 'Doe2',
		inventory: {},
		parents: defaultParents,
		faceFeatures: defaultFaceFeatures,
		position: defaultCharcterPositon,
		hairColors: defaultHairColors,
		eyeColor: 0,
		headOverlays: defaultHeadOverlays,
		clothes: default_male_clothes
	}
];
