import { Account } from '../server/db/entities/Account';
import { Character } from '../server/db/entities/Character';
import { Role } from '../server/db/entities/Role';

declare global {
	enum a {
		a = 'a'
	}
}

export namespace Types {
	export type AccountData = Omit<
		Account,
		'password' | 'salt' | 'dateCreated' | 'dateUpdated' | 'dateDeleted'
	> & {
		role: Pick<Role, 'name' | 'description' | 'color'>;
		characters: Omit<Character, 'dateUpdated' | 'dateDeleted'>[] | [] | null | undefined;
	};
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
}

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
	overlayId: number;
	index: number;
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
	hair: number;
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
