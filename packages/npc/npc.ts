import { NPC_Driver_Models } from './npc_driver_models';
import { NPC_Vehicle_Models } from './npc_vehicle_models';
import { NPC_Vehicle_Parking_Spots } from './npc_vehicle_parking_spots';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
const MAX_Controler_Distance: number = 400;
const MAX_NPC_PER_PLAYER: number = 200;
const MIN_Controler_Distance: number = 50;
let NPC_LIST: NPC_LIST[] = [];
let ReservePos: ReservePos[] = [];
const serverTickTime = 1000;
function startNPCTraffic() {
	for (let i = 0; i < 100; i++) {
		NPC_LIST.push({ Active_NPC: [] });
	}

	setInterval(() => {
		try {
			mp.players.forEach(async (player: PlayerMp) => {
				if (NPC_LIST[player.id].Active_NPC != null) {
					for (let i = 0; i < NPC_LIST[player.id].Active_NPC.length; i++) {
						if (NPC_LIST[player.id].Active_NPC[i].ped!.controller == undefined) {
							NPC_ExitStream(player, NPC_LIST[player.id].Active_NPC[i].ped.id);
							continue;
						}
						if (
							NPC_LIST[player.id].Active_NPC[i].ped != null &&
							NPC_LIST[player.id].Active_NPC[i].ped.data.traffic != undefined &&
							NPC_LIST[player.id].Active_NPC[i].veh.numberPlate.includes('HZ OI5')
						) {
							NPC_LIST[player.id].Active_NPC[i].veh!.numberPlate = 'LS ' + random(0, 100) + ' ' + random(0, 10000);
						}
						if (
							(NPC_LIST[player.id].Active_NPC[i].ped != null && !NPC_LIST[player.id].Active_NPC[i].ped != undefined) ||
							(NPC_LIST[player.id].Active_NPC[i].ped!.controller.dist(NPC_LIST[player.id].Active_NPC[i].ped!.position) > MAX_Controler_Distance &&
								NPC_LIST[player.id].Active_NPC[i].ped.data.traffic != undefined)
						) {
						} else if (NPC_LIST[player.id].Active_NPC[i].veh?.getOccupant(0) == null && NPC_LIST[player.id].Active_NPC[i].ped.data.traffic != undefined) {
							NPC_ExitStream(player, NPC_LIST[player.id].Active_NPC[i].ped.id);
							updateNPCDeletedCounter();
						}
					}

					if (NPC_LIST[player.id].Active_NPC.length <= MAX_NPC_PER_PLAYER) {
						new mp.Vector3({ x: 0, y: 0, z: 0 });
						let phash = random(0, NPC_Driver_Models.length - 1);
						let vhash = random(0, NPC_Vehicle_Models.length - 1);
						let newlist: NewVehicleData[] = [];

						for (let j = 0; j < NPC_Vehicle_Parking_Spots.length; j++) {
							if (player.dist(NPC_Vehicle_Parking_Spots[j].position) < MAX_Controler_Distance && player.dist(NPC_Vehicle_Parking_Spots[j].position) > MIN_Controler_Distance) {
								newlist.push({ position: NPC_Vehicle_Parking_Spots[j].position, spawnable: NPC_Vehicle_Parking_Spots[j].spawnable, heading: NPC_Vehicle_Parking_Spots[j].heading });
							}
						}
						if (player.dimension != 0 /*|| player.vehicle != null && (player.vehicle. == 16 || player.vehicle.class == 15 || player.vehicle.class == 14)*/) {
							return;
						}
						for (let i = 0; i < newlist.length; i++) {
							let posrnd: number = random(0, newlist.length);
							let numPlayersInRange = 0;
							mp.players.forEachInRange(newlist[posrnd].position, MIN_Controler_Distance, () => {
								numPlayersInRange++;
							});
							if (newlist[posrnd].spawnable < Date.now() && numPlayersInRange == 0 && mp.peds.toArray().find((x) => x.dist(newlist[posrnd].position) < 5) == null) {
								let ammount = 0;
								mp.peds.forEach((ped) => {
									if (ped.controller == player) {
										ammount++;
									}
								});
								if (NPC_LIST[player.id].Active_NPC.length >= MAX_NPC_PER_PLAYER || ammount >= MAX_NPC_PER_PLAYER) {
									break;
								}
								newlist[posrnd].spawnable = Date.now() + 100;
								let ped: PedMp = mp.peds.new(NPC_Driver_Models[phash], getPedOffset(newlist[posrnd].position), { heading: 0, dynamic: true, lockController: false, dimension: 0 });
								ped.controller = player;
								let blip: BlipMp = mp.blips.new(1, newlist[posrnd].position, { alpha: 255, name: 'NPC', drawDistance: 1000, shortRange: false, dimension: 0 });
								let veh: VehicleMp = mp.vehicles.new(NPC_Vehicle_Models[vhash], newlist[posrnd].position, {
									heading: newlist[posrnd].heading,
									color: [
										[random(0, 255), random(0, 255), random(0, 255)],
										[random(0, 255), random(0, 255), random(0, 255)]
									],
									numberPlate: 'LS-' + ped.id,
									locked: false
								});
								//console.log({ blip: blip.id, veh: veh.id, traffic: true });
								NPC_LIST[player.id].Active_NPC.push({ id: 0, veh: veh, ped: ped, blip: blip });
								ped.setVariables({ blip: blip.id, veh: veh.id, traffic: true });
								player.call('startPedDriveWanderTask', [ped.id, veh.id]);
								updateNPCCreatedCounter();
							}
						}
					}
				}
			});
		} catch (error) {
			console.log('NPC SYSTEM ERROR~n' + error);
		}
	}, serverTickTime);

	setInterval(() => {
		mp.players.forEach((player) => {
			if (NPC_LIST[player.id].Active_NPC != null) {
				NPC_LIST[player.id].Active_NPC.forEach((play) => {
					if (mp.vehicles.exists(play.veh)) {
						play.blip.position = play.veh.position;
					}
				});
			}
		});
	}, 50);
}

function getPedOffset(position: Vector3): Vector3 {
	//position.z += 1.5;
	return position;
}

function updateNPCCreatedCounter() {
	//npccreated++;
}

function updateNPCDeletedCounter() {
	//npcdeleted++;
}

mp.events.add('CreateReserve', (player: PlayerMp) => CreateReserveSpawnPosition(player));
function CreateReserveSpawnPosition(player: PlayerMp) {
	if (player.vehicle != null) {
		let pos: Vector3 = player.position;
		let heading: number = player.vehicle.rotation.z;
		mp.blips.new(1, pos, { alpha: 255, name: 'Reserved', drawDistance: 200, shortRange: false });
		ReservePos.push({ position: pos, heading: heading });
		setTimeout(() => {
			mp.vehicles.new(RageEnums.Hashes.Vehicle.DRAFTER, pos, {
				heading: heading,
				color: [
					[random(0, 255), random(0, 255), random(0, 255)],
					[random(0, 255), random(0, 255), random(0, 255)]
				],
				numberPlate: 'LS-' + ReservePos.length,
				locked: false
			});
		}, 5000);
	}
}

mp.events.add('RemoveReserve', (player: PlayerMp) => RemoveReserve(player));
function RemoveReserve(player: PlayerMp) {
	ReservePos = ReservePos.filter((x) => player.dist(x.position) < 4);
}

mp.events.add('IncreasePed', (player: PlayerMp, ped: PedMp) => IncreasePed(player, ped));
function IncreasePed(player: PlayerMp, ped: PedMp) {
	if (ped != null) {
		if (NPC_LIST[player.id].Active_NPC.find((x) => x.ped.id == ped.id) != null) {
		} else {
			let veh = ped.data.veh;
			let blip = ped.data.blip;
			NPC_LIST[player.id].Active_NPC.push({ id: 0, veh: veh, ped: ped, blip: blip });
		}
	}
}

mp.events.add('NPC_ExitStream', (player: PlayerMp, pedId: number) => NPC_ExitStream(player, pedId));
function NPC_ExitStream(player: PlayerMp, pedId: number) {
	const NPC = mp.peds.at(pedId);
	if (player == null && NPC!.controller != null) {
		player = NPC.controller;
	}
	if (NPC == null) {
		console.log('NPC VALUE = NULL!!!!!');
		return;
	}
	const index: number = NPC_LIST[player.id].Active_NPC.findIndex((x) => x.ped.id == NPC.id);
	if (NPC.dist(NPC.controller.position) > MAX_Controler_Distance) {
		mp.players.forEach((player: PlayerMp) => {
			if (NPC.dist(player.position) < MAX_Controler_Distance) {
				NPC.controller = player;
				return;
			}
		});
	}
	let vehId = NPC.getVariable('veh');
	mp.vehicles.at(vehId).destroy();
	//console.log('NPC vehicle deleted ' + Date.now());
	let blipId = NPC.getVariable('blip');
	mp.blips.at(blipId).destroy();
	//console.log('NPC blip deleted ' + Date.now());
	NPC.destroy();
	//console.log('NPC deleted');
	NPC_LIST[player.id].Active_NPC.splice(index);
}

mp.events.add('setheadingparking', (player: PlayerMp, x: number, y: number, z: number, heading: number) => setheadingparking(player, x, y, z, heading));
function setheadingparking(_player: PlayerMp, x: number, y: number, z: number, heading: number) {
	let pos: Vector3 = new Vector3(x, y, z);
	if (x != 0) {
		if (NPC_Vehicle_Parking_Spots.find((x) => x.position == pos) != undefined && NPC_Vehicle_Parking_Spots.find((x) => x.position == pos)!.heading != 0) {
			NPC_Vehicle_Parking_Spots[NPC_Vehicle_Parking_Spots.findIndex((x) => x.position == pos)].heading = heading;
			console.log(pos.x + 'Finded And Insert ' + heading);
		} else if (NPC_Vehicle_Parking_Spots.find((x) => x.position == pos) == undefined) {
			NPC_Vehicle_Parking_Spots.push({ spawnable: 0, position: pos, heading: heading });
			console.log(pos.x + 'NEW Thing Founded ' + heading);
		}
	}
}

mp.events.add('packagesLoaded', () => {
	startNPCTraffic();
	mp.peds.forEach((ped) => {
		console.log(ped.position);
	});
});

mp.events.add('playerJoin', (player: PlayerMp) => {
	player.position = new mp.Vector3(222.196, 206.755, 105.5);
});
