import * as fs from 'fs';

import { Command } from './command';
import path from 'path';
import { yellow } from 'colorette';

const directoryPath = path.join(__dirname);

const files = fs.readdirSync(directoryPath).filter((file) => file.endsWith('.cmd.ts'));

export default class CommandProcessor {
	private next: Command | null = null;

	static aliasList: string[] = new Array();

	private static _instance: CommandProcessor = new CommandProcessor();

	public static get instance(): CommandProcessor {
		return CommandProcessor._instance;
	}

	private constructor() {}

	process(player: PlayerMp, cmd: string): void {
		this.next?.run(player, cmd);
	}

	static async init() {
		const handlers: Command[] = [];

		for (let file of files) {
			try {
				const module = await import('./commands/' + file);
				for (let key in module) {
					handlers.push(new module[key]());
				}
			} catch (e) {
				console.log(e);
			}
		}

		for (let i = 0; i < handlers.length; i++) {
			if (i < handlers.length - 1) {
				this.aliasList.push(handlers[i].alias);
				handlers[i].setNextHandler(handlers[i + 1]);
			}
		}
		this.instance.next = handlers[0];
		console.log(`${yellow('[INFO]')} Command processor initialized...`);
	}
}

(async () => {
	CommandProcessor.init();
})();
