export abstract class Command {
	abstract alias: string;
	next: Command | null = null;

	abstract process(player: PlayerMp, args: string[]): void;

	run(player: PlayerMp, cmd: string) {
		const [alias, ...args] = cmd.split(' ');
		if (alias == this.alias) {
			this.process(player, args);
		} else if (this.next != null) {
			this.next.run(player, cmd);
		} else {
			console.log('Unknown command');
		}
	}

	setNextHandler(handler: Command): void {
		this.next = handler;
	}
}
