import { Command } from '../command';

export class VehicleCommand extends Command {
	alias: string = 'vehicle';

	process(player: PlayerMp, args: string[]): void {
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
