mp.events.add('guiReady', () => {
	/*
	mp.game.ped.removeScenarioBlockingArea(0, true);
	mp.game.streaming.setPedPopulationBudget(3);
	mp.game.ped.setCreateRandomCops(true);
	mp.game.vehicle.setRandomBoats(true);
	mp.game.vehicle.setRandomTrains(true);
	mp.game.vehicle.setGarbageTrucks(true);
	mp.game.streaming.setVehiclePopulationBudget(3);
	mp.game.invoke('0x34AD89078831A4BC'); // SET_ALL_VEHICLE_GENERATORS_ACTIVE
	mp.game.vehicle.setAllLowPriorityVehicleGeneratorsActive(true);
	mp.game.vehicle.setNumberOfParkedVehicles(-1);
	mp.game.vehicle.displayDistantVehicles(true);
	mp.game.graphics.disableVehicleDistantlights(false);
    */
});

mp.events.add('entityStreamOut', (entity: EntityMp) => entityStreamOut(entity));
function entityStreamOut(entity: EntityMp) {
	//let msg = 'entity streamed out';
	if (entity.type == 'ped') {
		//msg += ' ped';

		if (entity.getVariable('traffic')) {
			//msg += ' and called server';
			mp.events.callRemote('NPC_ExitStream', entity.remoteId);
		}
	}
	//mp.gui.chat.push(msg);
}

mp.events.add('startPedDriveWanderTask', async (pedRemoteId: number) => {
	//let startTime = Date.now();
	let ped: PedMp = mp.peds.atRemoteId(pedRemoteId);
	let vehicleRemoteId = await ped.getVariable('veh');
	let veh: VehicleMp = mp.vehicles.atRemoteId(vehicleRemoteId);
	if (ped.doesExist()) {
		ped.setIntoVehicle(veh.handle, -1);
		await mp.game.waitAsync(250);
		ped.taskVehicleDriveWander(veh.handle, 20, 786603);
	}
	return;
});

mp.events.add('playerReady', () => {
	setInterval(() => {
		mp.peds.forEachInRange(mp.players.local.position, 500, (ped) => {
			if (ped.controller.remoteId != mp.players.local.remoteId) return;
			var veh: VehicleMp = mp.vehicles.atRemoteId(ped.getVariable('veh'));
			if (veh.isSeatFree(-1)) {
				ped.setIntoVehicle(veh.handle, -1);
				//mp.game.graphics.drawMarker(1, ped.position.x, ped.position.y, ped.position.z, 0, 0, 0, 0, 0, 0, 1, 1, 250, 0, 255, 0, 64, false, false, 2, false, null, null, false);
			}
			if (!ped.getIsTaskActive(151) && veh.getPedInSeat(-1) == ped.handle) {
				ped.taskVehicleDriveWander(veh.handle, 15, 786603);
				//mp.game.graphics.drawMarker(1, ped.position.x, ped.position.y, ped.position.z, 0, 0, 0, 0, 0, 0, 1, 1, 250, 255, 0, 0, 64, false, false, 2, false, null, null, false);
			}
		});
	}, 1000);
});

mp.keys.bind(0x47, false, () => {
	if (mp.players.local.vehicle === null && !mp.gui.cursor.visible) {
		const vehicle = getClosestVehicleInRange(6);
		if (!vehicle) return;
		if (vehicle.isAVehicle()) {
			mp.players.local.setIntoVehicle(vehicle.handle, 1);
		}
	}
});

const getClosestVehicleInRange = (range: number): VehicleMp | null => {
	let closestVehicle = null;
	let closestDistance = range + 1;
	const position = mp.players.local.position;
	mp.vehicles.forEachInRange(position, range, (vehicle) => {
		const distToPlayer = calcDist(position, vehicle.position);
		if (distToPlayer < closestDistance) {
			closestVehicle = vehicle;
			closestDistance = distToPlayer;
		}
	});
	return closestVehicle;
};
const calcDist = (v1: Vector3, v2: Vector3) => {
	return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
};

mp.events.add('entityControllerChange', (entity: PedMp, _newController) => {
	//mp.gui.chat.push(`${entity.type}(ClientID: ${entity.id}) has switched to a new controller [${newController ? newController.name : 'Nobody'}]`);
	if (entity.type == 'ped' && entity.getVariable('traffic') && _newController.remoteId == mp.players.local.remoteId) {
	}
});
