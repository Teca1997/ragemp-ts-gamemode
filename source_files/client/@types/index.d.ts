import { CharacterData, ownDataType } from '@shared';

declare global {
	export interface PlayerMp {
		activeCharacter?: CharacterData;
		readonly ownData: ownDataType;
	}
}
