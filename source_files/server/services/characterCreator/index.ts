import { Server } from '@shared';
import { Database } from '../../db';
import { Character } from '../../db/entities/Character';

export class CharacterCreator {
	private static _instance: CharacterCreator = new CharacterCreator();

	private constructor() {
		mp.events.addProc(Server.Events.CharacterCreator.Save, this.save.bind(this));
		console.log(`[INFO] CharacterCreator started......`);
	}

	public static get instance(): CharacterCreator {
		return CharacterCreator._instance;
	}

	private async save(player: PlayerMp, data: string) {
		const characterData: Character = JSON.parse(data);
		characterData.account = player.ownData.account?.id;
		const newCharacter: Character = await Database.getRepository(Character).save(characterData);
		newCharacter.account = player.ownData.account!.id;
		player.ownData.account?.characters?.push(newCharacter);
		console.log(player.ownData.account?.characters);
		return true;
	}
}
