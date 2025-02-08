import { ProcessedNamespace } from '../types';
import { processNamespace } from '../utils/NamespaceEnumValueProcessor';

namespace CEFNamespce {
	export enum Pages {
		Auth,
		CharacterSelector,
		CharacterCreator,
		Hud
	}
	export namespace Events {
		export enum CharacterCreator {
			SetCharacterData
		}

		export enum Auth {
			SetAccountData
		}

		export enum PageManager {
			SetPage
		}
		export enum Toast {
			Success,
			Warning,
			Error,
			Info
		}
	}
}

export const CEF: ProcessedNamespace<typeof CEFNamespce> = processNamespace('CEF', CEFNamespce);
