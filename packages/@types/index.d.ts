import '@types';
declare global {
	interface PlayerMp {
		customProperty: number;

		customMethod(message: String): void;
	}

	interface NewVehicleData {
		position: Vector3;
		heading: number;
		spawnable: number;
	}

	interface NPC_LIST {
		Active_NPC: NPCObject[];
	}

	interface NPCObject {
		id: number;
		ped: PedMp;
		veh: VehicleMp;
		blip: BlipMp;
	}

	interface ReservePos {
		position: Vector3;
		heading: number;
	}

	interface NPCVehicleParkingSpot {
		position: Vector3;
		heading: number;
		spawnable: number;
	}

	interface CasinoPed {
		position: Vector3;
		heading: number;
		hash: number;
	}

	interface Vector {
		x: number;
		y: number;
		z: number;
	}

	interface Position {
		location: Vector;
		heading: number;
		dimension: number;
	}

	interface VehicleMod {
		modType: number;
		description: string;
		value: number;
	}

	interface CharacterVitals {
		armour: number;
		health: number;
		hunger: number;
		thirst: number;
	}

	interface CharacterParents {
		father: number;
		mother: number;
		similarity: number;
		skinSimilarity: number;
	}

	interface CharacterHeadOverlay {
		overlayId: number;
		index: number;
		opacity: number;
		firstColor: number;
		secondColor: number;
	}

	interface CharacterClothingItem {
		id: number;
		drawable: number;
		texture: number;
		palette: number;
	}

	interface CharacterHair {
		hair: number;
		color: number;
		highlightColor: number;
	}

	interface CharacterColors {
		eyebrowColor: number;
		beardColor: number;
		eyeColor: number;
		blushColor: number;
		lipstickColor: number;
		chestHairColor: number;
	}

	namespace NodeJS {
		interface ProcessEnv {
			PRODUCTION_MODE: string;
			COMPILER_USE_SWC: string;
			NODE_ENV: string;
			DB_SUPERUSERNAME: string;
			DB_SUPERPASSWORD: string;
			DB_USERNAME: string;
			DB_HOST: string;
			DB_DATABASE: string;
			DB_PASSWORD: string;
			DB_SCHEMA: string;
			DB_PORT: string;
			DB_LOGGING: string;
			DB_SYNCHRONISE: string;
			DB_DROPDB: string;
			DB_INSERTDATA: string;
		}
	}
}

export {};
