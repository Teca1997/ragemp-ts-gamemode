import { ProcessedNamespace } from '../types';
import { processNamespace } from '../utils/NamespaceEnumValueProcessor';

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
	}
}

export const Server: ProcessedNamespace<typeof ServerNamespace> = processNamespace(
	'Server',
	ServerNamespace
);
