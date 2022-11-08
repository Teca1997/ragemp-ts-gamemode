interface SpawnPoint {
	position: {
		x: number;
		y: number;
		z: number;
	};
	orientX: number;
	orientY: number;
	perpendicularLength: number;
	carModel: string;
	flags: number;
	popGroup: string;
	spawnable: number;
}

interface potentialSpawnPoint extends SpawnPoint {
	id: number;
}

interface NPCVehicle {
	ped: PedMp;
	vehicle: VehicleMp;
	blip: BlipMp;
	popGroup: string;
}

interface NPC {
	ped: PedMp;
	blip: BlipMp;
}

interface PlayerControledOnFootNPCs {
	[key: number]: {
		activeNPCs: NPC[];
	};
}

interface PlayerControledNPCs {
	[key: number]: {
		activeNPCs: NPCVehicle[];
	};
}
