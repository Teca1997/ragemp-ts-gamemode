import { CharacterData, ownDataType } from '../../shared/index';

declare global {
	interface PlayerMp {
		activeCharacter?: CharacterData;
		ownData: ownDataType;
		__ownData: ownDataType;
	}

	namespace NodeJS {
		interface Module {
			hot?: {
				accept: (path?: string, callback?: () => void) => void;
				dispose: (callback: (data: unknown) => void) => void;
			};
		}

		interface ProcessEnv {
			PRODUCTION_MODE: string;
			NODE_ENV: string;
			DB_SUPERUSERNAME: string;
			DB_SUPERPASSWORD: string;
			DB_USERNAME: string;
			DB_HOST: string;
			DB_DATABASE: string;
			DB_PASSWORD: string;
			DB_SCHEMA: string;
			DB_PORT: string;
		}
	}
}

export {};
