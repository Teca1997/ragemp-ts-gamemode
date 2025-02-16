import { ProcessedNamespace } from '../types';
import { Utils } from '../utils';

namespace CEFNamespce {
	export enum Pages {
		Auth,
		CharacterSelector,
		CharacterCreator,
		Hud
	}
	export namespace Events {
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

export const CEF: ProcessedNamespace<typeof CEFNamespce> = Utils.processNamespace(
	'CEF',
	CEFNamespce
);
