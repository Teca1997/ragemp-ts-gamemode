mp.events.add('entityStreamIn', (entity: PedMp) => {
	if (entity.type === 'player') {
		let data = entity.getVariable('currentWeaponTint');

		if (data) {
			let [weaponHash, tintIndex] = data.split('|');
			weaponHash = parseInt(weaponHash, 36);

			entity.giveWeapon(weaponHash, -1, true);
			mp.game.invoke(RageEnums.Natives.WEAPON.SET_PED_WEAPON_TINT_INDEX, entity.handle, weaponHash >> 0, tintIndex >> 0);
			mp.game.invoke(RageEnums.Natives.WEAPON.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, tintIndex >> 0);
		}
	}
});

mp.events.addDataHandler('currentWeaponTint', (entity: PedMp, value) => {
	if (entity.type === 'player' && entity.handle !== 0) {
		let [weaponHash, tintIndex] = value.split('|');
		weaponHash = parseInt(weaponHash, 36);

		mp.game.invoke(RageEnums.Natives.WEAPON.SET_PED_WEAPON_TINT_INDEX, entity.handle, weaponHash >> 0, tintIndex >> 0);
	}
});
