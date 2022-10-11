import '@types';
declare global {
	interface PlayerMp {
		customProperty: number;

		customMethod(message: String): void;
	}

	interface Position {
		x: number;
		y: number;
		z: number;
	}

	interface VehiclePosition {
		position: Position;
		heading: number;
		dimension: number;
	}

	interface VehicleMod {
		modType: number;
		description: string;
		value: number;
	}

	export interface PostgresInterval {
		years?: number;
		months?: number;
		days?: number;
		hours?: number;
		minutes?: number;
		seconds?: number;
		milliseconds?: number;
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
		}
	}
}

export {};
