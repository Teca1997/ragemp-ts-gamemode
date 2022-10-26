class RayCastingManager {
	gameplayCam: CameraMp = mp.cameras.new('gameplay');
	distance: number = 10;

	constructor() {}

	getEntityBeingLookedAt(): any {
		let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
		const direction = this.gameplayCam.getDirection();
		const endPosition = new mp.Vector3(
			direction.x * this.distance + startPosition.x,
			direction.y * this.distance + startPosition.y,
			direction.z * this.distance + startPosition.z
		);
		return mp.raycasting.testCapsule(startPosition, endPosition, 0.25, mp.players.local, 18);
	}

	getOffsetFromZAxis(objectZ: number) {
		let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
		const direction = this.gameplayCam.getDirection();
		const endPosition = new mp.Vector3(
			direction.x * this.distance + startPosition.x,
			direction.y * this.distance + startPosition.y,
			direction.z * this.distance + startPosition.z
		);
		const lookingAtPosition = mp.raycasting.testPointToPoint(startPosition, endPosition, mp.players.local, 18);
		if (lookingAtPosition == undefined) return 0;
		const { z } = lookingAtPosition.position;

		return z - objectZ;
	}
}

export const rayc = new RayCastingManager();
