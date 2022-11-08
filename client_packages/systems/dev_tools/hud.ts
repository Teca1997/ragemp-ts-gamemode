import { rayc } from 'systems/raycasting';

const textScaleToSpacingRatio = 1 / 0.06;
const pointingDistance = 500;

var showEntityBeingLookedAtInfo = true;
var displayGameplayCamCoords = true;
var displayPointingAtPosition3D = true;
var displayPlayerCoords = true;
var displayPlayerHeading = true;
var displayPlayerTasksBeingPlayed = true;
var displayObjectBeingLookedAtInfo = false;
var displayReticle = true;
var direction: Vector3;
var coords: Vector3;

const render = (gameplayCam: CameraMp) => {
	direction = gameplayCam.getDirection();
	coords = gameplayCam.getCoord();

	var centerHudComponents: string[] = [];

	if (displayGameplayCamCoords) {
		centerHudComponents.push(`Gameplay cam coords: ${coords.x.toFixed(2)} ${coords.y.toFixed(2)} ${coords.z.toFixed(2)}`);
	}

	if (displayPointingAtPosition3D) {
		var pointingPosition = pointingAt(pointingDistance).position;
		if (pointingPosition != undefined) {
			mp.game.graphics.drawText(
				`pointAtCoord: ${pointingPosition.x.toFixed(2)} ${pointingPosition.y.toFixed(2)} ${pointingPosition.z.toFixed(2)}`,
				[pointingPosition.x, pointingPosition.y, pointingPosition.z],
				{
					font: 0,
					color: [255, 255, 255, 185],
					scale: [0.3, 0.3],
					outline: true
				}
			);
			mp.game.graphics.drawMarker(
				28,
				pointingPosition.x,
				pointingPosition.y,
				pointingPosition.z,
				0,
				0,
				0,
				0,
				0,
				0,
				0.305,
				0.305,
				0.305,
				255,
				0,
				0,
				64,
				false,
				false,
				2,
				false,
				null,
				null,
				false
			);
		}
	}

	const target = rayc.getEntityBeingLookedAt();

	if (displayPlayerCoords) {
		centerHudComponents.push(`Player coords: ${mp.players.local.position.x.toFixed(4)} ${mp.players.local.position.y.toFixed(4)} ${mp.players.local.position.z.toFixed(4)}`);
	}

	if (displayPlayerHeading) {
		centerHudComponents.push(`Player heading: ${mp.players.local.getHeading().toFixed(4)}`);
	}

	if (displayPlayerTasksBeingPlayed) {
		drawTextToScreen2D(['Playing tasks:'], 0.95, 0, 0.4);
		drawTextToScreen2D(getTaskBeingPlayedByPlayer().map(String), 0.95, 0.03, 0.4);
	}

	if (displayReticle) {
		mp.game.ui.showHudComponentThisFrame(14);
	}

	drawTextToScreen2D(centerHudComponents, 0.5, 0, 0.5);

	if (displayObjectBeingLookedAtInfo) {
		if (target != undefined && showEntityBeingLookedAtInfo) {
			const targetHandle = target.entity.handle == undefined ? target.entity : target.entity.handle;

			const objectPos = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_ENTITY_COORDS, targetHandle, true);
			const objectRot = mp.game.entity.getRotation(targetHandle, 2);
			const playerOffPos = mp.game.entity.getOffsetFromGivenWorldCoords(targetHandle, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z);

			mp.game.graphics.drawMarker(28, objectPos.x, objectPos.y, objectPos.z, 0, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, 0, 255, 0, 64, false, false, 2, false, null, null, false);

			var textToDisplayIn3d: string[] = [
				`Object model ${mp.game.entity.getModel(targetHandle)}`,
				`Object pos x:${objectPos.x.toFixed(2)} y:${objectPos.y.toFixed(2)} z:${objectPos.z.toFixed(2)}`,
				`Object rot: x:${objectRot.x.toFixed(2)} y:${objectRot.y.toFixed(2)} z:${objectRot.z.toFixed(2)}`,
				`Player pos offset from object x:${playerOffPos.x.toFixed(2)} y:${playerOffPos.y.toFixed(2)} z:${playerOffPos.z.toFixed(2)}`
			];

			var ped: PedMp = mp.peds.atHandle(targetHandle);
			if (ped != null) {
				textToDisplayIn3d.push(`[${ped.controller == mp.players.local ? 'localPlayer' : 'Nobody'}]`);
				for (let i = 0; i < 500; i++) {
					if (ped.getIsTaskActive(i)) {
						textToDisplayIn3d.push(`Ped playing task ${i}`);
					}
				}
			}
			drawTextToScreen3D(textToDisplayIn3d, objectPos.x, objectPos.y, objectPos.z, 0.5);
		}
	}
};

const getTaskBeingPlayedByPlayer = (): number[] => {
	let tasks: number[] = [];
	for (var i = 0; i < 500; i++) {
		if (mp.players.local.getIsTaskActive(i)) {
			tasks.push(i);
		}
	}
	return tasks;
};

const pointingAt = (distance: number): any => {
	const farAway = new mp.Vector3(direction.x * distance + coords.x, direction.y * distance + coords.y, direction.z * distance + coords.z);

	const result = mp.raycasting.testPointToPoint(coords, farAway, mp.players.local, [1, 2, 4, 8, 16]);
	if (result === undefined) {
		return 'undefined';
	}
	return result;
};

const drawTextToScreen3D = (text: string[], x: number, y: number, z: number, textScale: number) => {
	for (var i = 0; i < text.length; i++) {
		mp.game.graphics.drawText(text[i], [x, y, z + 0.3 * i], {
			font: 0,
			color: [255, 255, 255, 255],
			scale: [textScale, textScale],
			outline: true
		});
	}
};

const drawTextToScreen2D = (text: string[], x: number, y: number, textScale: number) => {
	for (var i = 0; i < text.length; i++) {
		mp.game.graphics.drawText(text[i], [x, y + (textScale / textScaleToSpacingRatio) * i], {
			font: 0,
			color: [255, 255, 255, 255],
			scale: [textScale, textScale],
			outline: true
		});
	}
};

const toggleHUDComponent = (name: string) => {
	switch (name) {
		case 'gameplay_cam_coordinates':
			displayGameplayCamCoords = !displayGameplayCamCoords;
			break;
		case 'pointing_at_position_3d':
			displayPointingAtPosition3D = !displayPointingAtPosition3D;
			break;
		case 'player_coordinates':
			displayPlayerCoords = !displayPlayerCoords;
			break;
		case 'player_heading':
			displayPlayerHeading = !displayPlayerHeading;
			break;
		case 'player_tasks_being_played':
			displayPlayerTasksBeingPlayed = !displayPlayerTasksBeingPlayed;
			break;
		case 'object_being_looked_at_info':
			displayObjectBeingLookedAtInfo = !displayObjectBeingLookedAtInfo;
			break;
		case 'reticle':
			displayReticle = !displayReticle;
			break;
	}
};

export const DevHud = { render, toggleHUDComponent };
