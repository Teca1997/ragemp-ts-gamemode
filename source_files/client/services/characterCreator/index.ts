export class CharacterSelector {
	private static _instance: CharacterSelector = new CharacterSelector();

	private constructor() {
		mp.console.logInfo(`[INFO] Character selector started......`);
	}

	public static get instance(): CharacterSelector {
		return CharacterSelector._instance;
	}

	start() {
		mp.console.logInfo('started character creator');
	}
}
