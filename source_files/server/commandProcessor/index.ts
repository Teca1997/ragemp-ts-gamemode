import { yellow } from 'colorette';
import { Command } from './command';
import { VehicleCommand } from './commands/vehicle';

export default class CommandProcessor {
	private commandChain: Command | null = null;

	private aliasList: string[] = new Array();

	private static _instance: CommandProcessor = new CommandProcessor();

	public static get instance(): CommandProcessor {
		return CommandProcessor._instance;
	}

	private constructor() {
		const handlers: Command[] = [];

		handlers.push(new VehicleCommand());

		for (let i = 0; i < handlers.length; i++) {
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

		console.log(`${yellow('[INFO]')} Command processor initialized...`);
	}

	process(player: PlayerMp, cmd: string): void {
		this.commandChain?.run(player, cmd);
	}
}
