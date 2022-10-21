import 'sit_anywhere/scenarionBrowser';

import { sittableObjects } from 'sit_anywhere/config';

const gameplayCam = mp.cameras.new('gameplay');
const distance = 10;
let target: any;
let oldTarget: any = undefined;
let currentSeatChoice: { vector: Vector3; headingOffset: number } | undefined;
let currentSeat: { vector: Vector3; headingOffset: number } | undefined;
let sittableObject: undefined | any = undefined;

//let currentObject: number | null = null;

mp.events.add('render', () => {
	target = getEntityBeingLookedAt();
	if (target != oldTarget) {
		currentSeatChoice = undefined;
		sittableObject = undefined;
		oldTarget = target;
	}
	if (currentSeat != undefined) return;
	if (target == undefined) {
		oldTarget = undefined;
		currentSeatChoice = undefined;
		sittableObject = undefined;
		return;
	}
	mp.game.ui.showHudComponentThisFrame(14);
	mp.game.graphics.drawText(
		`Object model: ${mp.game.invoke(
			RageEnums.Natives.ENTITY.GET_ENTITY_MODEL,
			target.entity.handle == undefined ? target.entity : target.entity.handle
		)}`,
		[0.5, 0.065],
		{
			font: 0,
			color: [255, 255, 255, 185],
			scale: [0.3, 0.3],
			outline: true
		}
	);

	if (sittableObject == undefined) {
		//mp.gui.chat.push('searching for sittable object ' + Date.now());
		sittableObject = sittableObjects.find(
			(sittableObjects) =>
				sittableObjects.propHash ==
				mp.game.invoke(RageEnums.Natives.ENTITY.GET_ENTITY_MODEL, target.entity.handle == undefined ? target.entity : target.entity.handle)
		);
	}
	if (sittableObject == undefined) return;

	const seatCoordinates: { vector: Vector3; headingOffset: number }[] = [];
	sittableObject.seats.forEach((seat: any) => {
		seatCoordinates.push({
			vector: mp.game.invokeVector3(
				RageEnums.Natives.ENTITY.GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS,
				target.entity.handle == undefined ? target.entity : target.entity.handle,
				seat.offsetX,
				seat.offsetY,
				seat.offsetZ
			),
			headingOffset: seat.headingOffset
		});
	});

	currentSeatChoice = getShortesDistanceBetweenNCoordiates(target.position, seatCoordinates);
	const { x, y, z } = currentSeatChoice.vector;
	mp.game.graphics.drawText('Press ~r~E ~w~to sit', [x, y, z], {
		font: 1,
		color: [255, 255, 255, 185],
		scale: [0.5, 0.5],
		outline: true,
		centre: true
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
	return mp.raycasting.testCapsule(startPosition, endPosition, 0.25, mp.players.local, 18);
}

function getShortesDistanceBetweenNCoordiates(
	startCoord: Vector3,
	coords: { vector: Vector3; headingOffset: number }[]
): { vector: Vector3; headingOffset: number } {
	let distance = 5;
	let closestCoord: { vector: Vector3; headingOffset: number } = { vector: new mp.Vector3(0, 0, 0), headingOffset: 180 };
	coords.forEach((coord) => {
		const coordsDistance = mp.game.gameplay.getDistanceBetweenCoords(
			startCoord.x,
			startCoord.y,
			startCoord.z,
			coord.vector.x,
			coord.vector.y,
			coord.vector.z,
			true
		);
		if (distance > coordsDistance) {
			distance = coordsDistance;
			closestCoord = coord;
		}
	});
	//mp.gui.chat.push('seat heading offset' + closestCoord.headingOffset + ' ' + Date.now());
	return closestCoord;
}

mp.events.add('sit:sit', () => {
	if (currentSeatChoice === undefined) return;
	currentSeat = currentSeatChoice;
	const { x, y, z } = currentSeat!.vector;
	const heading: number =
		mp.game.invokeFloat(RageEnums.Natives.ENTITY.GET_ENTITY_HEADING, target.entity.handle == undefined ? target.entity : target.entity.handle) +
		currentSeat.headingOffset;
	//mp.events.callRemote('consoleLog', x + ',' + y + ',' + z + ',' + objectHeading);
	mp.players.local.taskStartScenarioAtPosition(sittableObject.scenario, x, y, z, heading, 0, true, false);
});

mp.keys.bind(0x45, true, function () {
	if (currentSeat != undefined) {
		currentSeat = undefined;
		mp.players.local.clearTasks();
		mp.events.callRemote('sit:cancelSit', currentSeat);
		return;
	}
	if (currentSeatChoice == undefined) return;
	mp.events.callRemote('sit:trySit', JSON.stringify(currentSeatChoice));
});

mp.events.add('playerReady', () => {
	mp.players.local.clearTasksImmediately();
});

function spawnTestObjects() {
	for (let i = 0; i < sittableObjects.length / 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (i * 4 + j >= sittableObjects.length) return;
			let object = mp.objects.new(sittableObjects[i * 4 + j].propHash, new mp.Vector3(-1526 + i * 4, -3191 + j * 4, 12.94), {
				rotation: new mp.Vector3(0, 0, 0),
				alpha: 255,
				dimension: 0
			});
			let objectDimensions = mp.game.gameplay.getModelDimensions(sittableObjects[i * 4 + j].propHash);
			let width = objectDimensions.minimum.x - objectDimensions.maximum.x;
			let lenght = objectDimensions.minimum.y - objectDimensions.maximum.y;
			let height = objectDimensions.minimum.z - objectDimensions.maximum.z;
			mp.labels.new(
				sittableObjects[i * 4 + j].prop +
					'\n' +
					sittableObjects[i * 4 + j].propHash +
					'\n width: ' +
					width +
					'\n lenght: ' +
					lenght +
					'\n height: ' +
					height,
				new mp.Vector3(-1526 + i * 4, -3191 + j * 4, 15),
				{
					los: true,
					font: 0,
					drawDistance: 2
				}
			);
			if (object) {
				object.notifyStreaming = true;
			}
		}
	}
}

mp.events.add('entityStreamIn', (entity: ObjectMp) => {
	if (entity.type == 'object') {
		entity.placeOnGroundProperly();
	}
});

mp.gui.chat.push('sittable objects ' + sittableObjects.length);
spawnTestObjects();
