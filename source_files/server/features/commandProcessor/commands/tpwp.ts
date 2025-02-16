import { IPlayer } from '../../../utils/stubs';
import { Command } from '../command';

export class TeleportToWayPointCMD extends Command {
	alias: string = 'tpwp';

	process(player: IPlayer): void {}
}
