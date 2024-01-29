import * as fs from 'fs';

import { Command } from './command';

const directoryPath = 'src/command/commands';

const files = fs.readdirSync(directoryPath).filter((file) => file.endsWith('.cmd.ts'));

export default class CommandProcesor {
	private next: Command | null = null;

	constructor() {}

	process(player: PlayerMp, cmd: string): void {
		this.next?.run(player, cmd);
	}

	async init() {
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
				handlers[i].setNextHandler(handlers[i + 1]);
			}
		}
		this.next = handlers[0];
	}
}

/* function Logger(originalMethod: any) {
  function replacementMethod(this: any, ...args: any[]) {
    console.log("start:", originalMethod.name);
    const result = originalMethod.call(this, ...args);
    console.log("end:", originalMethod.name);
    return result;
  }

  return replacementMethod;
}
 */
