import CommandProcesor from './command.processor';

const commandProcesor = new CommandProcesor();

mp.events.add('packagesLoaded', async () => {
	await commandProcesor.init();
});

mp.events.add('playerCommand', (player: PlayerMp, command: string) => commandProcesor.process(player, command));
