import { authCamerasData } from './authCameraPairs';

export class AuthCameraPair {
	private _startCamera: CameraMp;
	public get startCamera(): CameraMp {
		return this._startCamera;
	}
	public set startCamera(value: CameraMp) {
		this._startCamera = value;
	}
	private _endCamera: CameraMp;
	public get endCamera(): CameraMp {
		return this._endCamera;
	}
	public set endCamera(value: CameraMp) {
		this._endCamera = value;
	}
	private _duration: number;
	public get duration(): number {
		return this._duration;
	}
	public set duration(value: number) {
		this._duration = value;
	}

	private _nextAuthCameraPair: AuthCameraPair | null = null;
	public get nextAuthCameraPair(): AuthCameraPair | null {
		return this._nextAuthCameraPair;
	}
	public set nextAuthCameraPair(value: AuthCameraPair | null) {
		this._nextAuthCameraPair = value;
	}

	constructor(
		startCamera: CameraMp,
		endCamera: CameraMp,
		duration: number,
		next: AuthCameraPair | null
	) {
		this._startCamera = startCamera;
		this._endCamera = endCamera;
		this._duration = duration;
		this._nextAuthCameraPair = next;
		this.startInterp.bind(this);
	}

	static setupAuthCameras(): AuthCameraPair {
		const authCameraPairs: AuthCameraPair[] = [];

		authCamerasData.forEach((authCamera, index: number) => {
			const startCamera = mp.cameras.new(
				'StartAuthCamera' + index,
				authCamera.startCamera.position,
				new mp.Vector3(0, 0, 0),
				40
			);
			startCamera.pointAtCoord(
				authCamera.startCamera.pointAt.x,
				authCamera.startCamera.pointAt.y,
				authCamera.startCamera.pointAt.z
			);

			const endCamera = mp.cameras.new(
				'EndAuthCamera' + index,
				authCamera.endCamera.position,
				new mp.Vector3(0, 0, 0),
				40
			);
			endCamera.pointAtCoord(
				authCamera.endCamera.pointAt.x,
				authCamera.endCamera.pointAt.y,
				authCamera.endCamera.pointAt.z
			);
			authCameraPairs.push(
				new AuthCameraPair(
					startCamera,
					endCamera,
					authCamera.startCamera.position
						.negative()
						.add(authCamera.endCamera.position)
						.length() * 20,
					null
				)
			);
		});
		authCameraPairs[authCameraPairs.length - 1].nextAuthCameraPair = authCameraPairs[0];
		for (let index = 1; index < authCameraPairs.length; index++) {
			authCameraPairs[index - 1].nextAuthCameraPair = authCameraPairs[index];
		}

		return authCameraPairs[0];
	}

	startInterp() {
		if (this.nextAuthCameraPair?.endCamera) {
			this.endCamera.setActiveWithInterp(this.startCamera.handle, this.duration >>> 0, 0, 0);
			mp.game.cam.renderScriptCams(true, true, 0, true, false, 0);
			setTimeout(() => {
				this.nextAuthCameraPair?.startInterp();
			}, this.duration >>> 0);
		}
	}
}
