import { Injectable } from '@nestjs/common';
import { MPEvent } from 'utils/decorators/event/Event.decorator';
import { IPlayer } from '../../utils/stubs';
import { PunishmentService } from './punishment.service';

@Injectable()
export class PunishmentEvents {
	constructor(private punishmentService?: PunishmentService) {}

	@MPEvent()
	private async playerJoin(player: IPlayer) {
		const { socialClub, serial, ip } = player;
		await this.punishmentService?.savePlayerIdentifiers(socialClub, serial, ip);
	}
}
