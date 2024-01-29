export abstract class Command {
	abstract alias: string;
	next: Command | null = null;

	abstract process(player: PlayerMp, cmd: string): void;

	run(player: PlayerMp, cmd: string) {
		if (cmd.split(' ')[0] == this.alias) {
			this.process(player, cmd);
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
