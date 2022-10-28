let SpawnedAnimals = [];
const Interval = 1000;
const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
enum Animals {
	Deer,
	Boar
}

enum AnimalStates {
	Fleeing,
	Grazing,
	Wandering
}

const AnimalSpawnPoints: Vector3[] = [
	new mp.Vector3(-1725.521, 4699.659, 33.80555) /*,
	new mp.Vector3(-1690.836, 4682.494, 24.47228),
	new mp.Vector3(-1661.219, 4650.042, 26.12522),
	new mp.Vector3(-1613.11, 4632.693, 46.37965),
	new mp.Vector3(-1569.1, 4688.946, 48.04772),
	new mp.Vector3(-1549.585, 4766.055, 60.47577),
	new mp.Vector3(-1461.021, 4702.999, 39.26906),
	new mp.Vector3(-1397.87, 4637.824, 72.12587),
	new mp.Vector3(-617.851, 5762.557, 31.45378),
	new mp.Vector3(-613.3984, 5863.435, 22.00531),
	new mp.Vector3(-512.6949, 5940.441, 34.46115),
	new mp.Vector3(-363.9753, 5921.967, 43.97315),
	new mp.Vector3(-384.0528, 5866.263, 49.28809),
	new mp.Vector3(-374.6584, 5798.462, 62.83068),
	new mp.Vector3(-448.7513, 5565.69, 71.9878),
	new mp.Vector3(-551.2087, 5167.825, 97.50465),
	new mp.Vector3(-603.5089, 5154.867, 110.1652),
	new mp.Vector3(-711.7279, 5149.544, 114.7229),
	new mp.Vector3(-711.3442, 5075.649, 138.9036),
	new mp.Vector3(-672.9759, 5042.516, 152.8032),
	new mp.Vector3(-661.6283, 4974.586, 172.7258),
	new mp.Vector3(-600.277, 4918.438, 176.7214),
	new mp.Vector3(-588.3793, 4889.981, 181.3767),
	new mp.Vector3(-549.8376, 4838.274, 183.2239),
	new mp.Vector3(-478.639, 4831.655, 209.2594),
	new mp.Vector3(-399.3954, 4865.303, 203.7752),
	new mp.Vector3(-411.9441, 4946.082, 177.4535),
	new mp.Vector3(-414.8653, 5074.294, 149.0627)*/
];

function getDistanceFrom2Vectors(vector1: Vector3, vector2: Vector3): number {
	return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
}

function RandomFarawayDestination(currentPos: Vector3): Vector3 {
	var choices: Vector3[] = [];
	AnimalSpawnPoints.forEach((spawn: Vector3) => {
		if (getDistanceFrom2Vectors(spawn, currentPos) > 5) {
			choices.push(spawn);
		}
	});
	return choices[rnd(0, choices.length)];
}

mp.events.add('hunting:update_animal_position', (player, handle: PedMp, position: Vector3) => updateAnimalPosition(player, handle, position));

function updateAnimalPosition(player: PlayerMp, handle: PedMp, position: Vector3) {
	handle.position = position;
	console.log('handle type' + JSON.stringify(handle.controller));
	console.log('player' + JSON.stringify(player.name));
	console.log('position' + JSON.stringify(position));
	console.log('updated position for ped type ' + handle.type);
}

mp.events.add('packagesLoaded', () => packagesLoaded());
function packagesLoaded(): void {
	let n = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			if (n == 0) {
				new HuntingAnimal(new mp.Vector3(-2117 + i * 4, 2893 + j * 4, 32.815), Animals.Deer, AnimalStates.Wandering);
				n = 1;
			} else {
				new HuntingAnimal(new mp.Vector3(-1526 + i * 4, -3191 + j * 4, 15), Animals.Boar, AnimalStates.Wandering);
				n = 0;
			}
		}
	}
	console.log('[HUNTING] Created ' + SpawnedAnimals.length + ' animals.');
}

class HuntingAnimal {
	handle: PedMp;
	spawn: Vector3;
	type: Animals;
	state: AnimalStates;
	stateTimer: NodeJS.Timer;

	updateState: boolean = true;
	fleeingPed: PlayerMp | undefined;
	stateChangeTick: number = 0;
	destination: Vector3 | undefined;
	constructor(spawn: Vector3, type: Animals, state: AnimalStates) {
		let pedHash: number;
		switch (type) {
			case Animals.Boar:
				pedHash = RageEnums.Hashes.Ped.A_C_BOAR;
				break;
			case Animals.Deer:
				pedHash = RageEnums.Hashes.Ped.A_C_BOAR;
				break;
			default:
				pedHash = RageEnums.Hashes.Ped.A_C_BOAR;
				break;
		}
		this.handle = mp.peds.new(pedHash, spawn, { dynamic: true, frozen: false, invincible: false, lockController: false, heading: 0, dimension: 0 });
		this.handle.controller = mp.players.at(0);
		this.spawn = spawn;
		this.type = type;
		this.state = state;
		this.stateTimer = setInterval(() => this.AnimalAI(), Interval);

		SpawnedAnimals.push(this);
	}

	async AnimalAI() {
		this.handle;
		if (this.handle == null) return;
		const PlayersInRadius: PlayerMp[] = [];
		mp.players.forEach((player: PlayerMp) => {
			if (player == null) return;

			if (player.dist(this.handle.position) <= 100) {
				PlayersInRadius.push(player);
			}

			if (PlayersInRadius.length == 0) return;

			//PlayersInRadius[0].call('hunting:update_animal_position', [PlayersInRadius[0], this.handle]);

			PlayersInRadius.forEach(async (_player) => {
				try {
					const isDead = await _player.callProc('hunting:get_Is_Dead_Or_Dying_From_Player', [this.handle]);
					if (isDead) {
						PlayersInRadius.forEach((_p) => {
							_p.call('hunting:update_animal_death', [this.handle]);
						});
					}
				} catch (error) {
					console.log('error calling proc');
				}

				if (PlayersInRadius.length > 0 && this.state != AnimalStates.Fleeing) {
					this.state = AnimalStates.Fleeing;
					this.fleeingPed = PlayersInRadius[0];
					this.updateState = true;
				}

				this.stateChangeTick++;

				if (this.state != AnimalStates.Fleeing) {
					if (this.stateChangeTick > 15) {
						var nextStateChance = rnd(0, 100);

						if (nextStateChance < 30) {
							this.state = AnimalStates.Grazing;
							player.call('hunting:playAnimalScenario', [this.handle, this.type == Animals.Deer ? 'WORLD_DEER_GRAZING' : 'WORLD_PIG_GRAZING']);
						} else {
							this.state = AnimalStates.Wandering;
							this.destination = RandomFarawayDestination(this.handle.position);
							this.updateState = true;
						}
						this.stateChangeTick = 0;
					}
				} else {
					// Make the animal stop fleeing and go back to grazing the land.
					if (this.stateChangeTick > 20) {
						this.state = AnimalStates.Grazing;
						player.call('hunting:playAnimalScenario', [this.handle, this.type == Animals.Deer ? 'WORLD_DEER_GRAZING' : 'WORLD_PIG_GRAZING']);
						this.stateChangeTick = 0;
						console.log(`Animal with ID ${this.handle.id} requested to stop fleeing updated`);
					}
				}

				if (this.updateState != true) return;

				switch (this.state) {
					case AnimalStates.Fleeing:
						PlayersInRadius.forEach((player) => {
							player.call('hunting:animal_task_smart_flee', [this.handle, this.fleeingPed, 75, 10, false, false]);
						});
						break;

					case AnimalStates.Grazing:
						player.call('hunting:playAnimalScenario', [this.handle, this.type == Animals.Deer ? 'WORLD_DEER_GRAZING' : 'WORLD_PIG_GRAZING']);
						break;

					case AnimalStates.Wandering:
						PlayersInRadius.forEach((player) => {
							player.call('hunting:animal_task_Wander_in_area', [this.handle, this.destination!.x, this.destination!.y, this.destination!.z, 25, 0, 0]);
						});
						break;
				}
				this.updateState = false;
			});
		});
	}

	Respawn() {
		if (mp.peds.exists(this.handle.id)) this.handle.destroy();
		let pedHash;
		switch (this.type) {
			case Animals.Boar:
				pedHash = RageEnums.Hashes.Ped.A_C_BOAR;
				break;
			case Animals.Deer:
				pedHash = RageEnums.Hashes.Ped.A_C_BOAR;
				break;
			default:
				pedHash = RageEnums.Hashes.Ped.A_C_BOAR;
				break;
		}
		this.handle = mp.peds.new(pedHash, this.spawn);
	}
}
