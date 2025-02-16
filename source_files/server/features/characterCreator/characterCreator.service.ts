import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../../db/entities/Character';
import { IPlayer } from '../../utils/stubs';

@Injectable()
export class CharacterCreatorService {
	constructor(@InjectRepository(Character) private readonly characterRepo: Repository<Character>) {}

	async save(player: IPlayer, characterData: Character): Promise<boolean> {
		characterData.account = player.ownData.account?.id;
		const newCharacter: Character = await this.characterRepo.save(characterData);
		console.log(player.ownData.account);

		const acc = player.ownData.account;
		acc?.characters?.push(newCharacter);
		player.ownData.account = acc;
		console.log(player.ownData.account);
		return true;
	}
}
