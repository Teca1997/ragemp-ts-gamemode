mp.events.addCommand('veh', (_player, _fullText, _args) => {
	if (_args[0] != '') {
		mp.vehicles.new(_args[0], _player.position);
	}
});

mp.events.addCommand('savedef', (player, _fullText, _args) => {
	if (player.vehicle) {
		player.call('vehicle:saveDeformation');
	}
});
console.log('veh deform imported');

mp.events.addCommand('fixveh', (player, _fullText, _args) => {
	if (player.vehicle) {
		player.vehicle.repair();
	}
});

mp.events.addCommand('applydef', (player, _fullText, _args) => {
	if (player.vehicle) {
		player.call('vehicle:applyDeformation');
	}
});
