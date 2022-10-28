import 'casino/casinoSetup';

import { casinoSittables } from 'casino/config';
import { rayc } from 'raycasting';

//mp.players.local.position = new mp.Vector3(948.9796, 53.5095, 75.9912);
let target: any;
let oldTarget: any = undefined;
let currentSeatChoice: { position: Vector3; rotation: Vector3; seatIndex: number } | undefined;
let currentSeat: { position: Vector3; rotation: Vector3; seatIndex: number } | undefined;
let allowSeatInteraction: boolean = true;

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
	const targetModel: string = mp.game.invoke(RageEnums.Natives.ENTITY.GET_ENTITY_MODEL, target.entity.handle == undefined ? target.entity : target.entity.handle);
	if (casinoSittables[targetModel] == undefined) return;

	try {
		const seatCoordinates: { position: Vector3; rotation: Vector3; seatIndex: number }[] = [];
		casinoSittables[targetModel].seats.forEach((seat: any) => {
			const position = mp.game.invokeVector3(
				RageEnums.Natives.ENTITY.GET_OFFSET_FROM_ENTITY_IN_WORLD_COORDS,
				target.entity.handle == undefined ? target.entity : target.entity.handle,
				seat.positionOffset.xPos,
				seat.positionOffset.yPos,
				seat.positionOffset.zPos
			);
			const objectRotation = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_ENTITY_ROTATION, target.entity.handle == undefined ? target.entity : target.entity.handle, 2);
			const rotation = new mp.Vector3(seat.rotationOffset.xRot + objectRotation.x, seat.rotationOffset.yRot + objectRotation.y, seat.rotationOffset.zRot + objectRotation.z);

			seatCoordinates.push({
				position: position,
				rotation: rotation,
				seatIndex: seat.seatIndex
			});
		});

		currentSeatChoice = getShortesDistanceBetweenNCoordiates(target.position, seatCoordinates);
		const { x, y, z } = currentSeatChoice!.position;
		mp.game.graphics.drawText('Press ~r~E ~w~to sit' + seatCoordinates.length, [x, y, z + 0.7], {
			font: 1,
			color: [255, 255, 255, 185],
			scale: [0.5, 0.5],
			outline: true,
			centre: true
		});
	} catch (error) {
		mp.gui.chat.push('error 1' + error);
	}
});

function getShortesDistanceBetweenNCoordiates(startCoord: Vector3, coords: { position: Vector3; rotation: Vector3; seatIndex: number }[]): { position: Vector3; rotation: Vector3; seatIndex: number } {
	let distance = 5;
	let closestCoord: { position: Vector3; rotation: Vector3; seatIndex: number } = {
		position: new mp.Vector3(0, 0, 0),
		rotation: new mp.Vector3(0, 0, 0),
		seatIndex: 0
	};
	try {
		coords.forEach((coord) => {
			const coordsDistance = mp.game.gameplay.getDistanceBetweenCoords(startCoord.x, startCoord.y, startCoord.z, coord.position.x, coord.position.y, coord.position.z, true);
			if (distance > coordsDistance) {
				distance = coordsDistance;
				closestCoord = coord;
			}
		});
	} catch (error) {
		mp.gui.chat.push('error 2' + error);
	}
	return closestCoord;
}

//let entryScene: number = 1;
//let exitScene: number | undefined = undefined;
mp.keys.bind(0x45, true, async function () {
	if (!allowSeatInteraction) return;
	if (isWalkingToSeat()) {
		mp.gui.chat.push('walking to anim offset');
		return;
	}
	if (currentSeat != undefined) {
		mp.gui.chat.push('Standing up');
		mp.events.callRemote('casino:cancelSit', JSON.stringify(currentSeat));
		mp.players.local.taskPlayAnim('anim_casino_b@amb@casino@games@shared@player', 'sit_exit_left', 1, 0.1, -1, 512, 0, false, false, false);
		await mp.game.waitAsync(4500);
		mp.players.local.clearTasksImmediately();
		currentSeat = undefined;
		return;
	}
	if (currentSeatChoice == undefined) return;
	mp.events.callRemote('casino:trySit', JSON.stringify(currentSeatChoice));
});

mp.events.add('casino:sit', async () => {
	try {
		mp.gui.chat.push('sitting down');
		if (currentSeatChoice == undefined) return;
		currentSeat = currentSeatChoice;
		const animDict = 'anim_casino_b@amb@casino@games@shared@player';
		const animName = getAnimSeat(currentSeat.seatIndex);
		var animPos = await mp.game.ped.getAnimInitialOffsetPosition(
			animDict,
			animName,
			currentSeat.position.x,
			currentSeat.position.y,
			currentSeat.position.z,
			currentSeat.rotation.x,
			currentSeat.rotation.y,
			currentSeat.rotation.z,
			0.01,
			2
		);
		//await mp.markers.new(28, animPos, 0.25);

		var animRot = await mp.game.ped.getAnimInitialOffsetRotation(
			animDict,
			animName,
			currentSeat.position.x,
			currentSeat.position.y,
			currentSeat.position.z,
			currentSeat.rotation.x,
			currentSeat.rotation.y,
			currentSeat.rotation.z,
			0.01,
			2
		);

		//mp.players.local.taskStartScenarioAtPosition('Standing', animPos.x, animPos.y, animPos.z, animRot.z, 1000, false, false);

		allowSeatInteraction = false;
		await mp.players.local.taskGoStraightToCoord(animPos.x, animPos.y, animPos.z, 1.0, 5000, animRot.z, 0.01);

		const startTime = Date.now();
		let distance = 1;
		while (distance > 0.009 && !(mp.players.local.heading + 0.1 > animRot.z + 0.01) && !(mp.players.local.heading - 0.1 < animRot.z - 0.01)) {
			const { x, y, z } = mp.players.local.position;
			distance = mp.game.gameplay.getDistanceBetweenCoords(animPos.x, animPos.y, animPos.z, x, y, z, true);
			await mp.game.waitAsync(100);
			//mp.gui.chat.push('time ' + Date.now());
			if (Date.now() - startTime > 5000) {
				mp.gui.chat.push('teleported after failing to reach animation starting position');
				break;
			}
		}
		await mp.game.waitAsync(3000);
		const animTime = mp.game.entity.getAnimDuration(animDict, animName);
		mp.gui.chat.push('anim time' + animTime);
		mp.players.local.setRotation(animRot.x, animRot.y, animRot.z, 2, false);
		mp.players.local.position = animPos;
		mp.players.local.taskPlayAnim(animDict, animName, 1, 0.1, -1, 2 + 512, 0, false, false, false);
		await mp.game.waitAsync(3000);
		allowSeatInteraction = true;
	} catch (error) {
		mp.gui.chat.push('error ' + error);
	}
});

function isWalkingToSeat(): boolean {
	return mp.players.local.getIsTaskActive(15) && mp.players.local.getIsTaskActive(35);
}

export function getAnimSeat(seatid: number) {
	if (seatid == 0) return 'sit_enter_left';
	else if (seatid == 1) return 'sit_enter_left_side';
	else if (seatid == 2) return 'sit_enter_right_side';
	else if (seatid == 3) return 'sit_enter_right';
	else return 'sit_enter_right';
}

mp.game.streaming.requestIpl('vw_casino_main');
//mp.players.local.position = new mp.Vector3(1151.28 - 0.28, 267.33, -51.84);

//mp.players.local.position = new mp.Vector3(-1445, -3210, 13);
function spawnTestObjects() {
	for (let i = 0; i < Object.keys(casinoSittables).length / 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (i * 4 + j >= Object.keys(casinoSittables).length) return;
			let object = mp.objects.new(Number(Object.keys(casinoSittables)[i * 4 + j]), new mp.Vector3(-1444 + i * 4, -3210 + j * 4, 15), {
				rotation: new mp.Vector3(0, 0, 0),
				alpha: 255,
				dimension: 0
			});
			let { maximum, minimum } = mp.game.gameplay.getModelDimensions(Number(Object.keys(casinoSittables)[i * 4 + j]));
			let width = maximum.x - minimum.x;
			let lenght = maximum.y - minimum.y;
			let height = maximum.z - minimum.z;
			mp.labels.new(
				casinoSittables[Number(Object.keys(casinoSittables)[i * 4 + j])].prop +
					'\n' +
					Number(Object.keys(casinoSittables)[i * 4 + j]) +
					'\n width: ' +
					width +
					'\n lenght: ' +
					lenght +
					'\n height: ' +
					height,
				new mp.Vector3(-1444 + i * 4, -3210 + j * 4, 15),
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

spawnTestObjects();
