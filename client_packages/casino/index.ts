import { casinoSittables } from 'casino/config';
import { rayc } from 'raycasting';

mp.game.streaming.requestIpl('vw_casino_main');
mp.game.streaming.requestIpl('int_mp_casino');

mp.gui.chat.push('clawles_int_placement' + mp.game.streaming.isIplActive('clawles_int_placement'));
mp.gui.chat.push('int_clawles_casino_garag_milo_' + mp.game.streaming.isIplActive('int_clawles_casino_garag_milo_'));
mp.gui.chat.push('int_clawles_casino_milo_' + mp.game.streaming.isIplActive('int_clawles_casino_milo_'));

mp.game.streaming.requestAnimDict('anim_casino_b@amb@casino@games@shared@player@');
mp.game.streaming.requestAnimDict('amb@prop_human_seat_bar@female@elbows_on_bar@react_coward');
mp.game.streaming.requestAnimDict('anim@amb@facility@launch_controls@');

mp.players.local.position = new mp.Vector3(945.48, 52.43, 76.86);
let target: any;
let oldTarget: any = undefined;
let currentSeatChoice: { position: Vector3; rotation: Vector3; seatIndex: number } | undefined;
let currentSeat: { position: Vector3; rotation: Vector3; seatIndex: number } | undefined;

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
	const targetModel: string = mp.game.invoke(
		RageEnums.Natives.ENTITY.GET_ENTITY_MODEL,
		target.entity.handle == undefined ? target.entity : target.entity.handle
	);
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
			const objectRotation = mp.game.invokeVector3(
				RageEnums.Natives.ENTITY.GET_ENTITY_ROTATION,
				5,
				target.entity.handle == undefined ? target.entity : target.entity.handle
			);
			const rotation = new mp.Vector3(
				seat.rotationOffset.xRot + objectRotation.x,
				seat.rotationOffset.yRot + objectRotation.y,
				seat.rotationOffset.zRot + objectRotation.z
			);

			seatCoordinates.push({
				position: position,
				rotation: rotation,
				seatIndex: seat.seatIndex
			});
		});

		currentSeatChoice = getShortesDistanceBetweenNCoordiates(target.position, seatCoordinates);
		const { x, y, z } = currentSeatChoice!.position;
		mp.game.graphics.drawText('Press ~r~E ~w~to sit' + seatCoordinates.length, [x, y, z], {
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

function getShortesDistanceBetweenNCoordiates(
	startCoord: Vector3,
	coords: { position: Vector3; rotation: Vector3; seatIndex: number }[]
): { position: Vector3; rotation: Vector3; seatIndex: number } {
	let distance = 5;
	let closestCoord: { position: Vector3; rotation: Vector3; seatIndex: number } = {
		position: new mp.Vector3(0, 0, 0),
		rotation: new mp.Vector3(0, 0, 0),
		seatIndex: 0
	};
	try {
		coords.forEach((coord) => {
			const coordsDistance = mp.game.gameplay.getDistanceBetweenCoords(
				startCoord.x,
				startCoord.y,
				startCoord.z,
				coord.position.x,
				coord.position.y,
				coord.position.z,
				true
			);
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

let entryScene: number = 1;
//let exitScene: number | undefined = undefined;
mp.keys.bind(0x45, true, function () {
	if (mp.game.ped.isSynchronizedSceneRunning(entryScene)) {
		mp.gui.chat.push('playing entry scene');
		return;
	}
	if (currentSeat != undefined) {
		mp.events.callRemote('casino:cancelSit', JSON.stringify(currentSeat));
		mp.players.local.taskPlayAnim('anim_casino_b@amb@casino@games@shared@player@', 'sit_exit_left', 3.0, 1.0, 2500, 2, 0, false, false, false);
		currentSeat = undefined;
		return;
	}
	if (currentSeatChoice == undefined) return;
	mp.events.callRemote('casino:trySit', JSON.stringify(currentSeatChoice));
});

mp.events.add('casino:sit', () => {
	try {
		if (currentSeatChoice == undefined) return;
		currentSeat = currentSeatChoice;
		mp.gui.chat.push('current seat' + JSON.stringify(currentSeat));
		const animDict = 'anim_casino_b@amb@casino@games@shared@player@';
		const animName = getAnimSeat(currentSeat.seatIndex);
		var animPos = mp.game.ped.getAnimInitialOffsetPosition(
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
		mp.gui.chat.push('animPos ' + JSON.stringify(animPos));
		mp.markers.new(28, animPos, 0.25);

		var animRot = mp.game.ped.getAnimInitialOffsetRotation(
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

		const offsetPos = mp.game.invokeVector3(
			RageEnums.Natives.ENTITY.GET_OFFSET_FROM_ENTITY_GIVEN_WORLD_COORDS,
			target.entity.handle == undefined ? target.entity : target.entity.handle,
			currentSeat.position.x,
			currentSeat.position.y,
			currentSeat.position.z
		);

		mp.events.callRemote(
			'consoleLog',
			JSON.stringify({
				positionOffset: { xPos: offsetPos.x, yPos: offsetPos.y, zPos: offsetPos.z },
				rotationOffset: {
					xRot: currentSeat.rotation.x,
					yRot: currentSeat.rotation.y,
					zRot: currentSeat.rotation.z
				},
				seatIndex: currentSeat.seatIndex
			})
		);

		entryScene = mp.game.ped.createSynchronizedScene(
			currentSeat.position.x,
			currentSeat.position.y,
			currentSeat.position.z,
			animRot.x,
			animRot.y,
			animRot.z + 90,
			2
		);
		mp.game.ped.setSynchronizedSceneLooped(entryScene, false);
		mp.players.local.taskSynchronizedScene(entryScene, animDict, animName, 1000.0, -8.0, 16, 0, 0x447a0000, 1);
	} catch (error) {
		mp.gui.chat.push('error ' + error);
	}
});

export function getAnimSeat(seatid: number) {
	if (seatid == 0) return 'sit_enter_left';
	else if (seatid == 1) return 'sit_enter_left_side';
	else if (seatid == 2) return 'sit_enter_right_side';
	else if (seatid == 3) return 'sit_enter_right';
	else return 'sit_enter_right';
}

mp.players.local.position = new mp.Vector3(-1445, -3210, 13);
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

mp.events.add('click', (_x, _y, upOrDown, _leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
	if (_leftOrRight == 'right' && _hitEntity == 0 && upOrDown == 'up' && mp.keys.isDown(17)) {
		const target: any = mp.raycasting.testCapsule(mp.players.local.getBoneCoords(12844, 0.5, 0, 0), _worldPosition, 0.25, mp.players.local, 18);
		if (target == undefined) return;

		const boneCount = mp.game.invoke(
			RageEnums.Natives.ENTITY._GET_ENTITY_BONE_COUNT,
			target.entity.handle == undefined ? target.entity : target.entity.handle
		);
		mp.gui.chat.push('bone count ' + boneCount);
	}
});
