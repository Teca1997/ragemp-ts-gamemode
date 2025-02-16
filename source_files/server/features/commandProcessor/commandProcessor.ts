import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { blueBright } from 'colorette';
import { IPlayer } from '../../utils/stubs';
import { Command } from './command';
import { TeleportToWayPointCMD } from './commands/tpwp';
import { VehicleCMD } from './commands/vehicle';

@Injectable()
export class CommandProcessor implements OnApplicationBootstrap {
	private commandChain: Command | null = null;

	private aliasList: string[] = new Array();

	onApplicationBootstrap() {
		const handlers: Command[] = [];

		handlers.push(new VehicleCMD(), new TeleportToWayPointCMD());

		for (let i = 0; i < handlers.length; i++) {
			console.log(`${blueBright('[COMMAND PROCESSOR]')} Added ${handlers[i].alias} command.`);
			if (i < handlers.length - 1) {
				this.aliasList.push(handlers[i].alias);
				handlers[i].setNextHandler(handlers[i + 1]);
			}
		}

		if (handlers.length > 0) {
			this.commandChain = handlers[0];
			mp.events.add('playerCommand', this.process.bind(this));
		} else {
			console.log('No commands loaded');
		}
	}

	constructor() {}

	process(player: IPlayer, cmd: string): void {
		this.commandChain?.run(player, cmd);
	}
}
