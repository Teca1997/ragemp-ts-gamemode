mp.events.addCommand('weapon', (player: PlayerMp, _fullText: string, ...args: string[]) => {
	if (args[0] == undefined) return;
	player.giveWeapon(RageEnums.Hashes.Weapon.APPISTOL, 1000);
});

mp.events.addCommand('veh', (player: PlayerMp, _fullText: string, ...args: string[]) => {
	if (args[0] == undefined) return;
	mp.vehicles.new(mp.joaat(args[0]), player.position);
});
