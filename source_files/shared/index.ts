import { Account } from '../server/db/entities/Account';
import { Character } from '../server/db/entities/Character';
import { Role } from '../server/db/entities/Role';

export namespace Config {
	export const CharacterSelector = {
		PlayerPosition: { x: -38.28577423095703, y: -589.6845703125, z: 78.83023071289062 },
		PlayerHeading: -27.438535690307617,
		CameraDistance: 3
	};
}

export namespace Types {
	export interface Vector {
		x: number;
		y: number;
		z: number;
	}

	export interface Position {
		location: Vector;
		heading: number;
		dimension: number;
	}

	export interface VehicleMod {
		modType: number;
		description: string;
		value: number;
	}

	export type RoleData = Pick<Role, 'name' | 'description' | 'color'>;

	export type CharacterData = Omit<Character, 'dateUpdated' | 'dateDeleted' | 'account'>;

	export type AccountData = Omit<
		Account,
		'password' | 'salt' | 'dateCreated' | 'dateUpdated' | 'dateDeleted'
	> & {
		role: RoleData;
		characters: CharacterData[] | [] | null | undefined;
	};

	export type PlayerServiceData = Pick<
		CharacterData,
		'faceFeatures' | 'colors' | 'gender' | 'hairColors' | 'headOverlays' | 'parents' | 'clothes'
	>;
}

export namespace Variables {
	export enum Player {
		Account = 'account'
	}
}

export namespace CEF {
	export enum Pages {
		Auth = 'auth',
		CharacterSelector = 'characterSelector',
		CharacterCreator = 'characterCreator',
		Hud = 'hud'
	}
	export namespace Events {
		export enum CharacterCreator {
			SetCharacterData = 'cef:characterCreator:setCharacterData'
		}

		export enum Auth {
			SetAccountData = 'cef:auth:setAccountData'
		}

		export enum PageManager {
			SetPage = 'cef:pageManager:setPage'
		}
		export enum Toast {
			Success = 'cef:toast:success',
			Warning = 'cef:toast:warning',
			Error = 'cef:toast:error',
			Info = 'cef:toast:info'
		}
	}
}

export namespace Client {
	export namespace Events {
		export enum Auth {
			Login = 'client:auth:login',
			Register = 'client:auth:register',
			StartAuthCameras = 'client:auth:StartAuthCameras',
			StopAuthCameras = 'client:auth:StopAuthCameras',
			Logout = 'client:auth:logout'
		}

		export enum CharacterSelector {
			Start = 'client:characterSelector:start',
			ApplyCharacter = 'client:characterSelector:apply',
			Play = 'client:characterSelector:play'
		}

		export enum CharacterCreator {
			Start = 'client:characterCreator:start',
			ApplyCharacter = 'client:characterCreator:apply',
			Save = 'client:characterCreator:save',
			GetNumParentPedsOfType = 'client:characterCreator:getNumParentPedsOfType',
			UpdateGander = 'client:characterCreator:updateGander',
			UpdateParents = 'client:characterCreator:updateParents',
			UpdateFaceFeature = 'client:characterCreator:updateFaceFeatures',
			UpdateHeadOverlay = 'client:characterCreator:updateHeadOverlay',
			GetNumHeadOverlayValues = 'client:characterCreator:getNumHeadOverlayValues'
		}
	}
}

export namespace Server {
	export namespace Events {
		export enum Auth {
			Login = 'server:auth:login',
			Register = 'server:auth:register',
			Logout = 'server:auth:logout'
		}

		export enum CharaterSelector {
			Start = 'server:characterSelector:start',
			Play = 'server:characterSelector:play',
			ApplyCharacter = 'server:characterSelector:apply'
		}
	}
}

export namespace Types {
	export type LoginFormValues = {
		username: string;
		password: string;
	};

	export type RegisterFormValues = {
		username: string;
		email: string;
		password: string;
		repeatPassword: string;
	};
	export interface CharacterVitals {
		armour: number;
		health: number;
		hunger: number;
		thirst: number;
	}

	export interface CharacterParents {
		father: number;
		mother: number;
		similarity: number;
		skinSimilarity: number;
	}

	export interface CharacterHeadOverlay {
		index: number;
		value: number;
		opacity: number;
		firstColor: number;
		secondColor: number;
	}

	export interface CharacterClothingItem {
		id: number;
		drawable: number;
		texture: number;
		palette: number;
	}

	export interface CharacterHair {
		color: number;
		highlightColor: number;
	}

	export interface CharacterColors {
		eyebrowColor: number;
		beardColor: number;
		eyeColor: number;
		blushColor: number;
		lipstickColor: number;
		chestHairColor: number;
	}
}

export const default_male_clothes: Types.CharacterClothingItem[] = [
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

export const default_female_clothes: Types.CharacterClothingItem[] = [
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

export const defaultParents: Types.CharacterParents = {
	father: 0,
	mother: 0,
	similarity: 0.5,
	skinSimilarity: 0.5
};

export const defaultFaceFeatures: number[] = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

export const defaultHeadOverlays: Types.CharacterHeadOverlay[] = [
	{ index: 0, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 1, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 2, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 3, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 4, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 5, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 6, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 7, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 8, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 9, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 10, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 11, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 12, value: 255, opacity: 0, firstColor: 0, secondColor: 0 },
	{ index: 13, value: 255, opacity: 0, firstColor: 0, secondColor: 0 }
];

export const defaultMaleCharacter: Types.CharacterData = {
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

export const defaultFemaleCharacter: Types.CharacterData = {
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
