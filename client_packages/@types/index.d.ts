import '@types';
declare global {
	interface PlayerMp {
		__weaponComponentData: {
			[key: number]: Set<number>;
		};
	}

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

	interface GuiCursorMp {
		/**
		 * Get X & Y coordinates of cursor.
		 */
		position: Array2d;

		/**
		 * Property used to gets/sets the cursor's visibility.
		 */
		visible: boolean;

		/**
		 * Show or hide the cursor on your screen
		 */
		show(freezeControls: boolean, state: boolean): void;
	}

	interface SittableObjects {
		[key: string]: {
			prop: string;
			scenario: string;
			seats: SittableObjectSeat[];
		};
	}

	interface AnimationListItem {
		DictionaryName: string;
		Animations: string[];
	}
}
