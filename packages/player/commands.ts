mp.events.addCommand('weapon', (player: PlayerMp, _fullText: string, ...args: string[]) => {
	if (args[0] == undefined) {
		player.outputChatBox('args[0] == undefined');
	}
	player.giveWeapon(RageEnums.Hashes.Weapon.APPISTOL, 1000);
});
