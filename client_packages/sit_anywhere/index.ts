import 'sit_anywhere/scenarionBrowser';

import { rayc } from 'raycasting';
import { sittableObjects } from 'sit_anywhere/config';

let target: any;
let oldTarget: any = undefined;
let currentSeatChoice: { vector: Vector3; headingOffset: number } | undefined;
let currentSeat: { vector: Vector3; headingOffset: number } | undefined;
let scenario: string | undefined;

//let currentObject: number | null = null;

mp.events.add('render', () => {
	target = rayc.getEntityBeingLookedAt();
	if (target != oldTarget) {
		currentSeatChoice = undefined;
		oldTarget = target;
	}
	if (currentSeat != undefined) return;
	if (target == undefined) {
		oldTarget = undefined;
		currentSeatChoice = undefined;
		return;
	}
	mp.game.ui.showHudComponentThisFrame(14);
	const pos = mp.game.invokeVector3(
		RageEnums.Natives.ENTITY.GET_ENTITY_COORDS,
		target.entity.handle == undefined ? target.entity : target.entity.handle,
		true
	);
	mp.game.graphics.drawMarker(28, pos.x, pos.y, pos.z, 0, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, 0, 255, 0, 64, false, false, 2, false, null, null, false);
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

	mp.game.graphics.drawText(`Offset from Z axis: ${rayc.getOffsetFromZAxis(pos.z).toFixed(3)}`, [0.5, 0.085], {
		font: 0,
		color: [255, 255, 255, 185],
		scale: [0.3, 0.3],
		outline: true
	});

	const targetModel: string = mp.game.invoke(
		RageEnums.Natives.ENTITY.GET_ENTITY_MODEL,
		target.entity.handle == undefined ? target.entity : target.entity.handle
	);
	if (sittableObjects[targetModel] == undefined) return;

	scenario = sittableObjects[targetModel].scenario;
	if (sittableObjects[targetModel].seats.length == 1) {
		currentSeatChoice = {
			vector: mp.game.invokeVector3(
				RageEnums.Natives.ENTITY.GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS,
				target.entity.handle == undefined ? target.entity : target.entity.handle,
				sittableObjects[targetModel].seats[0].offsetX,
				sittableObjects[targetModel].seats[0].offsetY,
				sittableObjects[targetModel].seats[0].offsetZ
			),
			headingOffset: sittableObjects[targetModel].seats[0].headingOffset
		};
	} else {
		const seatCoordinates: { vector: Vector3; headingOffset: number }[] = [];
		sittableObjects[targetModel].seats.forEach((seat: any) => {
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
	}

	const { x, y, z } = currentSeatChoice!.vector;
	mp.game.graphics.drawText('Press ~r~E ~w~to sit', [x, y, z], {
		font: 1,
		color: [255, 255, 255, 185],
		scale: [0.5, 0.5],
		outline: true,
		centre: true
	});
});

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
	if (scenario == undefined) return;
	mp.players.local.taskStartScenarioAtPosition(scenario!, x, y, z, heading, 0, true, false);
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
	for (let i = 0; i < Object.keys(sittableObjects).length / 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (i * 4 + j >= Object.keys(sittableObjects).length) return;
			let object = mp.objects.new(Number(Object.keys(sittableObjects)[i * 4 + j]), new mp.Vector3(-1526 + i * 4, -3191 + j * 4, 15), {
				rotation: new mp.Vector3(0, 0, 0),
				alpha: 255,
				dimension: 0
			});
			let { maximum, minimum } = mp.game.gameplay.getModelDimensions(Number(Object.keys(sittableObjects)[i * 4 + j]));
			let width = maximum.x - minimum.x;
			let lenght = maximum.y - minimum.y;
			let height = maximum.z - minimum.z;
			mp.labels.new(
				sittableObjects[Number(Object.keys(sittableObjects)[i * 4 + j])].prop +
					'\n' +
					Number(Object.keys(sittableObjects)[i * 4 + j]) +
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

			if (object != undefined) {
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
