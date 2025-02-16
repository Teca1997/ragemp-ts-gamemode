import { Bounce, toast } from 'react-toastify';

import { CEF } from '@shared';

export class ToastManager {
	private static _instance: ToastManager = new ToastManager();

	private constructor() {
		if (window.mp) {
			mp.events.add(CEF.Events.Toast.Error, this.error);
			mp.events.add(CEF.Events.Toast.Success, this.success);
			mp.events.add(CEF.Events.Toast.Warning, this.warning);
			mp.events.add(CEF.Events.Toast.Info, this.info);
		}
	}

	public static get instance(): ToastManager {
		return ToastManager._instance;
	}

	success(text: string) {
		toast.success(text, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Bounce
		});
	}

	info(text: string) {
		toast.info(text, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Bounce
		});
	}

	error(text: string) {
		toast.error(text, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Bounce
		});
	}

	warning(text: string) {
		toast.warning(text, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Bounce
		});
	}
}
