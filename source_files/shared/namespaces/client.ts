import { ProcessedNamespace } from '../types';
import { Utils } from '../utils';

namespace ClientNamespace {
	export namespace Events {
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
			UpdateGender,
			UpdateParents,
			UpdateFaceFeature,
			UpdateHeadOverlay,
			UpdateComponentVariation,
			UpdateHairColor,
			UpdateFirstName,
			UpdateLastName,
			GetNumOfComVarPermutions,
			GetNumHeadOverlayValues
		}
	}
}

export const Client: ProcessedNamespace<typeof ClientNamespace> = Utils.processNamespace(
	'Client',
	ClientNamespace
);
