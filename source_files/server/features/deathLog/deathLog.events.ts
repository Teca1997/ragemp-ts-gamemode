import { Injectable } from '@nestjs/common';
import { MPEvent } from 'utils/decorators/event/Event.decorator';
import { IPlayer } from '../../utils/stubs';
import { DeathLogService } from './deathLog.service';

@Injectable()
export class DeathLogEvents {
	constructor(private deathLogService?: DeathLogService) {}

	@MPEvent()
	private async playerDeath(player: IPlayer, reason: number, killer?: IPlayer | undefined) {
		player.spawn(new Vector3(0, 0, 0));

		if (!player.activeCharacter) return;

		await this.deathLogService?.saveDeathLog(
			player.activeCharacter.id!,
			reason,
			killer ? killer.activeCharacter?.id : null
		);
	}
}
