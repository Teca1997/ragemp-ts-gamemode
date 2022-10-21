import '@types';
declare global {
	interface SittableObjectSeat {
		offsetX: number;
		offsetY: number;
		offsetZ: number;
		headingOffset: number;
	}

	interface SittableObject {
		prop: string;
		propHash: number;
		scenario: string;
		seats: SittableObjectSeat[];
	}
}
