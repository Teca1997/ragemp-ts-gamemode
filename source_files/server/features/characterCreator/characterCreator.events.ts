import { Injectable } from '@nestjs/common';
import { Server } from '@shared';
import { MPEvent } from 'utils/decorators/event/Event.decorator';
import { Character } from '../../db/entities/Character';
import { IPlayer } from '../../utils/stubs';
import { CharacterCreatorService } from './characterCreator.service';

@Injectable()
export class CharacterCreatorEvents {
	constructor(private characterCreatorService?: CharacterCreatorService) {}

	@MPEvent({ name: Server.Events.CharacterCreator.Save, proc: true })
	private async save(player: IPlayer, data: string): Promise<boolean> {
		const characterData: Character = JSON.parse(data);
		await this.characterCreatorService?.save(player, characterData);
		return true;
	}
}
