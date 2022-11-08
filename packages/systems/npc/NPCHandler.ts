import { NPC_Vehicle_Parking_Spots } from './npc_vehicle_parking_spots';
import { SpawnPoints } from './SpawnPoints';
import { Utils } from '../../utils';
import { config } from './config';

const tickRate: number = 1000;
const blipRefreshRate = 10;
const maxNPCsPerPlayer: number = 0;
const maxControllerDistance: number = 200;
const minControllerDistance: number = 50;
const spawnPointCooldown: number = 60000;
const dimension: number = 0;
const consoleLogPreffix = `${Utils.ConsoleColors.Red}NPCVehicleHandler: `;

var NPCs: PlayerControledNPCs;
var NPCsFoot: PlayerControledOnFootNPCs;

NPCs = {};
NPCsFoot = {};
mp.events.add('playerJoin', (player: PlayerMp) => {
	player.position = new mp.Vector3(-1445, -3210, 13);
	player.model = mp.joaat('mp_f_freemode_01');
	player.setHeadBlend(33, 0, 0, 0, 0, 0, 1, 0, 0);
	//player.position = new mp.Vector3(948.9796, 53.5095, 75.9912);
	//Object.assign(player.id, {});
	NPCs[player.id] = { activeNPCs: [] };
	NPCsFoot[player.id] = { activeNPCs: [] };
});

const initNPCVehicleTraffic = () => {
	console.log('==================================================');
	console.log('=============NPCVehicleHandler started============');
	console.log('==================================================');
	setInterval(async () => NPCVehicleTrafficTick(), tickRate);
	setInterval(async () => updateBlipPositions(), blipRefreshRate);
	console.log('==================================================');
	console.log('=============NPCVehicleHandler started============');
	console.log('==================================================');
};

const initNPCOnFootTraffic = () => {
	console.log('==================================================');
	console.log('=============NPCVehicleHandler started============');
	console.log('==================================================');
	setInterval(async () => NPCOnFootTrafficTick(), tickRate);
	setInterval(async () => updateBlipPositions(), blipRefreshRate);
	console.log('==================================================');
	console.log('=============NPCVehicleHandler started============');
	console.log('==================================================');
};

const NPCOnFootTrafficTick = () => {
	mp.players.forEach(async (player: PlayerMp) => {
		try {
			while (NPCsFoot[player.id].activeNPCs.length < maxNPCsPerPlayer) {
				console.log('here');
				const potentialSpawnPoints: NPCVehicleParkingSpot2[] = [];
				let index = 0;
				for (var sp of NPC_Vehicle_Parking_Spots) {
					if (sp.spawnable - Date.now() < 0 && player.dist(new mp.Vector3(sp.position)) < maxControllerDistance && player.dist(new mp.Vector3(sp.position)) > minControllerDistance) {
						potentialSpawnPoints.push({ ...sp, id: index++ });
					}
				}
				const spawnPoint = potentialSpawnPoints[Utils.random(0, potentialSpawnPoints.length)];
				const position = new mp.Vector3(spawnPoint.position);
				const heading = spawnPoint.heading;
				SpawnPoints[spawnPoint.id].spawnable = Date.now() + spawnPointCooldown;
				addNPC(position, heading, player);
			}
			return;
		} catch (error) {
			console.log('error ' + error);
		}
	});
};

const NPCVehicleTrafficTick = async () => {
	//console.log('====================SERVER TICK====================');
	mp.players.forEach(async (player: PlayerMp) => {
		try {
			while (NPCs[player.id].activeNPCs.length < maxNPCsPerPlayer) {
				const potentialSpawnPoints: NPCVehicleParkingSpot2[] = [];
				let index = 0;
				for (var sp of NPC_Vehicle_Parking_Spots) {
					if (sp == undefined) {
						console.log(consoleLogPreffix + 'sp==undefined');
						return;
					}
					if (sp.spawnable - Date.now() < 0 && player.dist(new mp.Vector3(sp.position)) < maxControllerDistance && player.dist(new mp.Vector3(sp.position)) > minControllerDistance) {
						potentialSpawnPoints.push({ ...sp, id: index++ });
					}
					if (sp.spawnable != 0 && sp.spawnable - Date.now() < 0) console.log(sp.spawnable - Date.now());
				}
				const spawnPoint = potentialSpawnPoints[Utils.random(0, potentialSpawnPoints.length)];
				const position = new mp.Vector3(spawnPoint.position);
				const heading = spawnPoint.heading;
				SpawnPoints[spawnPoint.id].spawnable = Date.now() + spawnPointCooldown;
				player.call('startPedDriveWanderTask', [await addNPCVehicle(position, heading, player)]);
			}
			return;
		} catch (error) {
			console.log('error ' + error);
		}
	});
	//console.log('====================SERVER TICK====================');
};

const addNPC = (position: Vector3, heading: number, player: PlayerMp) => {
	console.log('spawned ped');

	var ped = mp.peds.new(mp.joaat('mp_f_freemode_01') /**/, position, {
		heading: heading,
		dynamic: true,
		lockController: false,
		dimension: dimension,
		frozen: false,
		invincible: true
	});
	ped.controller = player;
	player.call('startPedWanderTask', [ped.id]);

	var blip = mp.blips.new(1, ped.position);

	NPCsFoot[player.id].activeNPCs.push({ ped: ped, blip: blip });
};

const updateBlipPositions = () => {
	mp.players.forEach((player) => {
		NPCs[player.id].activeNPCs.forEach((npc) => {
			npc.blip.position = npc.vehicle.position;
		});
	});
};

const addNPCVehicle = async (position: Vector3, heading: number, player: PlayerMp): Promise<number> => {
	var vehicleHash: number;
	if (false) {
		vehicleHash = config.NPCTrafficBigVehicleModels[Utils.random(0, config.NPCTrafficBigVehicleModels.length)];
	} else {
		vehicleHash = config.NPCTrafficSmallVehicleModels[Utils.random(0, config.NPCTrafficSmallVehicleModels.length)];
	}

	const color = config.NPCSmallVehicleColors[Utils.random(0, config.NPCSmallVehicleColors.length)];
	var ped = await mp.peds.new(mp.joaat('mp_f_freemode_01') /**/, position, {
		heading: heading,
		dynamic: true,
		lockController: false,
		dimension: dimension,
		frozen: false,
		invincible: true
	});

	var vehicle = await mp.vehicles.new(vehicleHash, position, {
		alpha: 255,
		color: [
			[0, 255, 0],
			[0, 255, 0]
		],
		numberPlate: 'NPC-' + ped.id
	});
	vehicle.setVariables({ traffic: true });
	vehicle.controller = player;
	if (vehicle == undefined) {
		console.log(consoleLogPreffix + 'vehicle==undefined');
	}
	vehicle.setColor(color, color);
	vehicle.pearlescentColor = color;

	ped.controller = player;

	var blip = mp.blips.new(1, position, {
		alpha: 255,
		color: 5,
		dimension: dimension,
		drawDistance: 200,
		name: 'NPC VEHICLE',
		rotation: 0,
		scale: 1,
		shortRange: false
	});

	ped.setVariables({ blip: blip.id, vehicle: vehicle.id, traffic: true });
	NPCs[player.id].activeNPCs.push({ ped, vehicle, blip, popGroup: '' });

	return ped.id;
};

mp.events.add('NPC_ExitStream', (player: PlayerMp, pedId: number) => NPCExitStream(player, pedId));
const NPCExitStream = (player: PlayerMp, pedId: number) => {
	const NPC = mp.peds.at(pedId);
	if (NPC == undefined) {
		console.log(consoleLogPreffix + 'NPC==undefined');
		return;
	}
	if (NPC.dist(NPC.controller.position) > maxControllerDistance) {
		var newController: PlayerMp = mp.players.getClosestInDimension(NPC.position, dimension, 1)[0];
		if (newController != undefined && newController != player) {
			NPC.controller = newController;
			return;
		} else {
			deleteNPCVehicle(player.id, pedId);
		}
	}
};

const deleteNPCVehicle = (playerId: number, pedId: number) => {
	NPCs[playerId].activeNPCs.forEach((NPC) => {
		if (NPC.ped.id == pedId) {
			NPC.ped.destroy();
			NPC.blip.destroy();
			NPC.vehicle.destroy();
		}
	});
	NPCs[playerId].activeNPCs = NPCs[playerId].activeNPCs.filter((npc) => npc.ped.id != pedId);
};

export const NPCServerTrafficHandler = { initNPCVehicleTraffic, initNPCOnFootTraffic };
