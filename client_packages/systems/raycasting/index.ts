var gameplayCam: CameraMp = mp.cameras.new('gameplay');
var distance: number = 10;

function getEntityBeingLookedAt(): any {
	let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
	const direction = gameplayCam.getDirection();
	const endPosition = new mp.Vector3(direction.x * distance + startPosition.x, direction.y * distance + startPosition.y, direction.z * distance + startPosition.z);
	return mp.raycasting.testCapsule(startPosition, endPosition, 0.25, mp.players.local, 30);
}
function getOffsetFromZAxis(objectZ: number) {
	let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
	const direction = gameplayCam.getDirection();
	const endPosition = new mp.Vector3(direction.x * distance + startPosition.x, direction.y * distance + startPosition.y, direction.z * distance + startPosition.z);
	const lookingAtPosition = mp.raycasting.testPointToPoint(startPosition, endPosition, mp.players.local, 18);
	if (lookingAtPosition == undefined) return 0;
	const { z } = lookingAtPosition.position;

	return z - objectZ;
}

export const rayc = { getEntityBeingLookedAt, getOffsetFromZAxis };
