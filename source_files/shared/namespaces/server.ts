import { ProcessedNamespace } from '../types';
import { Utils } from '../utils';

namespace ServerNamespace {
	export namespace Events {
		export enum Auth {
			Login,
			Register,
			Logout
		}

		export enum CharaterSelector {
			Start,
			Play,
			ApplyCharacter
		}

		export enum CharacterCreator {
			Save
		}
	}
}

export const Server: ProcessedNamespace<typeof ServerNamespace> = Utils.processNamespace(
	'Server',
	ServerNamespace
);
