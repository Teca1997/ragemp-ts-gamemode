import { Account } from '../../server/db/entities/Account';
import { Character } from '../../server/db/entities/Character';
import { Role } from '../../server/db/entities/Role';

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
	color?: number;
	secondColor?: number;
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

type IsEnum<T> = T extends Record<string, number> ? true : false;

export type ProcessedNamespace<T> = {
	[K in keyof T]: T[K] extends Record<string, any>
		? IsEnum<T[K]> extends true
			? Record<keyof T[K], string>
			: ProcessedNamespace<T[K]>
		: never;
};
