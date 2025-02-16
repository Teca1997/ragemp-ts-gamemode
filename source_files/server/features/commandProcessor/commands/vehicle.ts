import { IPlayer } from '../../../utils/stubs';
import { Command } from '../command';

export class VehicleCMD extends Command {
	alias: string = 'vehicle';

	process(player: IPlayer, args: string[]): void {
		const [model] = args;

		if (model == undefined) {
			player.outputChatBox('No model provided');
		}

		mp.vehicles.new(mp.joaat(model), player.position, {
			alpha: 255,
			dimension: player.dimension,
			engine: true,
			heading: player.heading,
			numberPlate: 'admin'
		});
	}
}
