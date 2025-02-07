export class CameraService {
	private static _instance: CameraService = new CameraService();

	private constructor() {
		mp.console.logInfo(`[INFO] Camera aervice started......`);
	}

	public static get instance(): CameraService {
		return CameraService._instance;
	}
}
