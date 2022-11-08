mp.events.add('givePlayerWeapon', (player: PlayerMp, weaponName: string) => {
	player.giveWeapon(mp.joaat(weaponName), 1000);
});

mp.events.addProc('getClothes', (player: PlayerMp, componentId: number) => {
	console.log(componentId);
	const clothes = player.getClothes(componentId);
	return clothes;
});
