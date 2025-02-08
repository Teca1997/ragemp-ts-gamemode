import { ProcessedNamespace } from '../types';
import { processNamespace } from '../utils/NamespaceEnumValueProcessor';

namespace ClientNamespace {
	export namespace Events {
		export enum PlayerService {
			GetNumOfComVarPermutions,
			GetNumHeadOverlayValues
		}

		export enum Auth {
			Login,
			Register,
			StartAuthCameras,
			StopAuthCameras,
			Logout
		}

		export enum CharacterSelector {
			Start,
			ApplyCharacter,
			Play
		}

		export enum CharacterCreator {
			Start,
			ApplyCharacter,
			Save,
			UpdateGander,
			UpdateParents,
			UpdateFaceFeature,
			UpdateHeadOverlay
		}
	}
}

export const Client: ProcessedNamespace<typeof ClientNamespace> = processNamespace(
	'Client',
	ClientNamespace
);
