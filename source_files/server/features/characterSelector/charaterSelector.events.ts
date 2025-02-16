import { Injectable } from '@nestjs/common';
import { Server } from '@shared';
import { MPEvent } from 'utils/decorators/event/Event.decorator';
import { IPlayer } from '../../utils/stubs';
import { CharacterSelectorService } from './charaterSelector.service';

@Injectable()
export class CharacterSelectorEvents {
	constructor(private charaterSelectorService?: CharacterSelectorService) {}

	@MPEvent({ name: Server.Events.CharaterSelector.Play })
	private play(player: IPlayer, characterIndex: number) {
		this.charaterSelectorService?.play(player, characterIndex);
		return true;
	}
}
