function addComponentToPlayer(player: PlayerMp, weaponHash: number, componentHash: number) {
	if (!player.hasOwnProperty('__weaponComponentData')) player.__weaponComponentData = {};
	if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

	player.__weaponComponentData[weaponHash].add(componentHash);
	mp.game.invoke(RageEnums.Natives.WEAPON.GIVE_WEAPON_COMPONENT_TO_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

function removeComponentFromPlayer(player: PlayerMp, weaponHash: number, componentHash: number) {
	if (!player.hasOwnProperty('__weaponComponentData')) player.__weaponComponentData = {};
	if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

	player.__weaponComponentData[weaponHash].delete(componentHash);
	mp.game.invoke(RageEnums.Natives.WEAPON.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

mp.events.add('updatePlayerWeaponComponent', (player: PlayerMp, weaponHash: string, componentHash: string, removeComponent: boolean) => {
	if (removeComponent) {
		removeComponentFromPlayer(player, parseInt(weaponHash, 36), parseInt(componentHash, 36));
	} else {
		addComponentToPlayer(player, parseInt(weaponHash, 36), parseInt(componentHash, 36));
	}
	parseInt(weaponHash, 36);
});

mp.events.add('resetPlayerWeaponComponents', (player: PlayerMp, weaponHash) => {
	if (!player.hasOwnProperty('__weaponComponentData')) return;
	if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) return;

	weaponHash = parseInt(weaponHash, 36);

	for (let componentHash of player.__weaponComponentData[weaponHash]) {
		mp.game.invoke(RageEnums.Natives.WEAPON.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, componentHash >> 0);
	}
	player.__weaponComponentData[weaponHash].clear();
});

mp.events.add('nukePlayerWeaponComponents', (player) => {
	if (!player.hasOwnProperty('__weaponComponentData')) return;

	for (const weapon in player.__weaponComponentData) {
		for (const component of player.__weaponComponentData[weapon]) {
			mp.game.invoke(RageEnums.Natives.WEAPON.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, parseInt(weapon) >> 0, component >> 0);
		}
	}

	player.__weaponComponentData = {};
});

mp.events.add('entityStreamIn', (entity: PlayerMp) => {
	if (entity.type === 'player') {
		let data = entity.getVariable('currentWeaponComponents');

		if (data) {
			let [weaponHash, components] = data.split('.');
			weaponHash = parseInt(weaponHash, 36);
			let componentsArray = components && components.length > 0 ? components.split('|').map((hash: string) => parseInt(hash, 36)) : [];

			// don't touch this or you will have a bad time
			entity.giveWeapon(weaponHash, -1, true);
			for (let component of componentsArray) addComponentToPlayer(entity, weaponHash, component);
			mp.game.invoke(RageEnums.Natives.WEAPON.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);
		}
	}
});

mp.events.add('entityStreamOut', (entity: PlayerMp) => {
	if (entity.type === 'player' && entity.hasOwnProperty('__weaponComponentData')) entity.__weaponComponentData = {};
});

mp.events.addDataHandler('currentWeaponComponents', (entity: PlayerMp, value) => {
	if (entity.type === 'player' && entity.handle !== 0) {
		if (!entity.hasOwnProperty('__weaponComponentData')) entity.__weaponComponentData = {};

		let [weaponHash, components] = value.split('.');
		weaponHash = parseInt(weaponHash, 36);

		if (!entity.__weaponComponentData.hasOwnProperty(weaponHash)) entity.__weaponComponentData[weaponHash] = new Set();

		let currentComponents = entity.__weaponComponentData[weaponHash];
		let newComponents = components && components.length > 0 ? components.split('|').map((hash: string) => parseInt(hash, 36)) : [];

		for (let component of currentComponents) {
			if (!newComponents.includes(component)) removeComponentFromPlayer(entity, weaponHash, component);
		}

		for (let component of newComponents) addComponentToPlayer(entity, weaponHash, component);
		mp.game.invoke(RageEnums.Natives.WEAPON.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);

		entity.__weaponComponentData[weaponHash] = new Set(newComponents);
	}
});
