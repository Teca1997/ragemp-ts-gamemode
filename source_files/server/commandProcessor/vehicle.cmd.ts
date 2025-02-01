import { Command } from './command';

export class VehicleCommand extends Command {
	alias: string = 'vehicle';

	process(player: PlayerMp, cmd: string): void {
		const [model] = cmd;
		if (model == undefined) return;
		mp.vehicles.new(mp.joaat(model), player.position, {
			alpha: 255,
			dimension: player.dimension,
			engine: true,
			heading: player.heading,
			numberPlate: 'admin'
		});
	}
}
