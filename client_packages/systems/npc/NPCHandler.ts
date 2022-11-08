//mp.events.add('playerJoin', () => initNPCTraffic());
const initNPCTraffic = async () => {
	setInterval(async () => {
		mp.peds.forEachInStreamRange((ped) => {
			if (ped.controller.remoteId != mp.players.local.remoteId) return;

			if (ped.getIsTaskActive(15)) {
				mp.events.callRemote('NPC_ExitStream', ped.remoteId);
				mp.gui.chat.push('NPC playing task 15... deleting NPC');
				return;
			}
			var veh: VehicleMp = mp.vehicles.atRemoteId(ped.getVariable('vehicle'));
			if (veh.getPedInSeat(-1) != ped.handle) {
				ped.setIntoVehicle(veh.handle, -1);
				ped.taskVehicleDriveWander(veh.handle, 15, 786603);
			}
			if (!ped.getIsTaskActive(151) && veh.getPedInSeat(-1) == ped.handle) {
				ped.taskVehicleDriveWander(veh.handle, 15, 786603);
			}
		});
	}, 1000);
};

const initUnSyncedNPCTraffic = () => {
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
};
//initUnSyncedNPCTraffic();

mp.events.add('startPedDriveWanderTask', async (pedRemoteId: number) => startPedDriveWanderTask(pedRemoteId));
const startPedDriveWanderTask = async (pedRemoteId: number) => {
	//let startTime = Date.now();
	//mp.console.logInfo('Started ped task ' + Date.now());
	let ped: PedMp = mp.peds.atRemoteId(pedRemoteId);
	let vehicleRemoteId = await ped.getVariable('vehicle');
	let veh: VehicleMp = mp.vehicles.atRemoteId(vehicleRemoteId);
	if (ped.doesExist()) {
		ped.setIntoVehicle(veh.handle, -1);
		await mp.game.waitAsync(500);
		ped.taskVehicleDriveWander(veh.handle, 15, 786603);
	}
};

mp.events.add('entityStreamOut', (entity: EntityMp) => entityStreamOut(entity));
function entityStreamOut(entity: EntityMp) {
	//let msg = 'entity streamed out of type' + entity.type;
	if (entity.type == 'ped') {
		//msg += ' ped';
		if (entity.getVariable('traffic')) {
			//msg += ' and called server';
			mp.events.callRemote('NPC_ExitStream', entity.remoteId);
		}
	}
	//mp.gui.chat.push(msg);
}

mp.keys.bind(0x47, false, () => {
	if (mp.players.local.vehicle === null && !mp.gui.cursor.visible) {
		const vehicle = mp.vehicles.getClosest(mp.players.local.position, 1)[0];
		//mp.gui.chat.push('daw' + JSON.stringify(vehicle));
		if (!vehicle) return;
		//mp.gui.chat.push('set into veh');
		mp.players.local.setIntoVehicle(vehicle.handle, 0);
	}
});

const calcDist = (v1: Vector3, v2: Vector3) => {
	return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
};

/*
mp.events.add('entityControllerChange', (entity: PedMp, newController: PlayerMp) => entityControllerChange(entity, newController));

const entityControllerChange = (entity: PedMp, newController: PlayerMp) => {
	if ((entity.type == 'ped' || entity.type == 'vehicle') && entity.getVariable('traffic')) {
		if (!newController) {
			mp.console.logInfo(
				'distance to entity ' +
					mp.game.gameplay.getDistanceBetweenCoords(
						entity.position.x,
						entity.position.y,
						entity.position.z,
						mp.players.local.position.x,
						mp.players.local.position.y,
						mp.players.local.position.z,
						true
					) +
					'entity id ' +
					entity.remoteId
			);
			//mp.events.callRemote('NPC_ExitStream', entity.remoteId);
		}
		mp.console.logInfo(`${entity.type}(ClientID: ${entity.remoteId}) has switched to a new controller [${newController ? newController.name : 'Nobody'}]`);
	}
};

const getNVehicleSpawnLoctions = () => {};
*/

mp.events.add('startPedWanderTask', async (pedRemoteId: number) => startPedWanderTask(pedRemoteId));
const startPedWanderTask = async (pedRemoteId: number) => {
	let ped: PedMp = mp.peds.atRemoteId(pedRemoteId);
	if (ped == null || ped == undefined) return;
	if (ped.doesExist()) {
		ped.taskWanderStandard(100, 200);
	}
};
