import { ServiceBase } from '@utils';
import { injectable } from 'tsyringe';
import { AuthCameraPair } from './AuthCameraPair';

@injectable()
export class AuthService extends ServiceBase {
	private authCameraChain: AuthCameraPair = AuthCameraPair.setupAuthCameras();

	startAuthCameras() {
		this.authCameraChain.startCameraLoop();
	}

	stopAuthCameras() {
		this.authCameraChain.stopCameraLoop();
	}
}
