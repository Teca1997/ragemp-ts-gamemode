mp.events.addCommand('sc', (player: PlayerMp) => {
	player.call('openScenarioBrowser');
	console.log('broswer called');
});
