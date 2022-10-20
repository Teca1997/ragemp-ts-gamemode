const sittableObjects = [
	{
		prop: 'prop_bench_08',
		propHash: -403891623,
		scenario: 'PROP_HUMAN_SEAT_BENCH',
		seats: [
			{ offsetX: 0.75, offsetY: 0, offsetZ: 0.5 },
			{ offsetX: -0.75, offsetY: 0, offsetZ: 0.5 }
		]
	}
];

const gameplayCam = mp.cameras.new('gameplay');
const distance = 5;
let target: any;
let sitting: boolean = false;

let currentObject: number | null = null;

mp.events.add('render', () => {
	target = getEntityBeingLookedAt();
	if (target == undefined || sitting) return;
	const entityModel = mp.game.invoke(RageEnums.Natives.ENTITY.GET_ENTITY_MODEL, target.entity);

	const sittableObject = sittableObjects.find((sittableObjects) => sittableObjects.propHash == entityModel);
	if (sittableObject == undefined) return;
	const { x, y, z } = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_ENTITY_COORDS, target.entity);
	mp.game.graphics.drawText('Bench', [x, y, z + 0.5], {
		font: 1,
		color: [255, 255, 255, 185],
		scale: [0.5, 0.5],
		outline: true,
		centre: true
	});

	sittableObject.seats.forEach((seat) => {
		const { x, y, z } = mp.game.invokeVector3(
			RageEnums.Natives.ENTITY.GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS,
			target.entity,
			seat.offsetX,
			seat.offsetY,
			seat.offsetZ
		);
		mp.game.graphics.drawText('Press E to sit', [x, y, z], {
			font: 1,
			color: [255, 255, 255, 185],
			scale: [0.5, 0.5],
			outline: true,
			centre: true
		});
	});
});

function getEntityBeingLookedAt(): any {
	let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
	const direction = gameplayCam.getDirection();
	const endPosition = new mp.Vector3(
		direction.x * distance + startPosition.x,
		direction.y * distance + startPosition.y,
		direction.z * distance + startPosition.z
	);
	return mp.raycasting.testPointToPoint(startPosition, endPosition, mp.players.local, 18);
}

mp.keys.bind(0x45, true, function () {
	if (sitting) {
		sitting = false;
		mp.gui.chat.push('stood up');
		mp.players.local.clearTasks();
		return;
	}
	sitting = true;
	sittableObjects.forEach((sittableObject) => {
		const { x, y, z } = mp.players.local.position;
		currentObject = mp.game.object.getClosestObjectOfType(x, y, z, 2.0, sittableObject.propHash, false, false, false);
	});

	const objectCoords = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_ENTITY_COORDS, currentObject);
	const { x, y, z } = objectCoords;
	const objectHeading = mp.game.invokeFloat(RageEnums.Natives.ENTITY.GET_ENTITY_HEADING, currentObject);
	mp.players.local.taskStartScenarioAtPosition('PROP_HUMAN_SEAT_BENCH', x, y, z + 0.5, objectHeading + 180, 0, false, false);
	mp.gui.chat.push('sat down');
	return;

	if (target != undefined && !mp.players.local.isUsingScenario('PROP_HUMAN_SEAT_BENCH')) {
		mp.gui.chat.push('sat down');
		const offsetCoords = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS, target.entity, 0, 0, 0.5);
		const objectCoords = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_ENTITY_COORDS, target.entity);
		const { x, y, z } = objectCoords;
		const objectHeading = mp.game.invokeFloat(RageEnums.Natives.ENTITY.GET_ENTITY_HEADING, target.entity);
		mp.players.local.taskStartScenarioAtPosition('PROP_HUMAN_SEAT_BENCH', x, y, z + 0.5, objectHeading + 180, 0, false, false);

		mp.console.logInfo('object coords ' + JSON.stringify(objectCoords));
		mp.console.logInfo('offset coords ' + JSON.stringify(offsetCoords));
		mp.console.logInfo('object heading ' + objectHeading);
	} else if (mp.players.local.isUsingScenario('PROP_HUMAN_SEAT_BENCH')) {
		mp.gui.chat.push('stood up');
		mp.players.local.clearTasks();
	}
});

mp.events.add('playerReady', () => {
	mp.players.local.clearTasksImmediately();
	const { x, y, z } = mp.players.local.position;
	mp.players.local.taskStartScenarioAtPosition('PROP_HUMAN_SEAT_BENCH', x + 4, y, z, 0, 0, false, false);
});
