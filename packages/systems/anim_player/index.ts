mp.events.add({
	animationEvent: (player: PlayerMp, toggle, dirt: string, name: string, flag: number) => {
		if (!toggle) player.stopAnimation();
		else player.playAnimation(dirt.toString(), name.toString(), 2, flag);
	},
	playerCommand: (player, command) => {
		const args = command.split(/[ ]+/);
		const commandName = args.splice(0, 1)[0];
		console.log(args);
		console.log(commandName);
		switch (commandName) {
			case 'animplayer':
				player.call('createAnimList', [args[0]]);
				break;
			case 'animflag':
				if (args[0].match(/^[-\+]?\d+/) !== null) player.call('animFlag', [parseInt(args[0])]);
				else if (args[0] == 'up' || args[0] == 'down') player.call('animFlag', [args[0]]);
				else player.outputChatBox('Current command: /animflag [up/down]');
				break;
		}
	}
});
