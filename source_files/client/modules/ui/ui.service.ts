import { CEF } from '@shared';
import { singleton } from 'tsyringe';

@singleton()
export class UIService {
	private browser: BrowserMp = mp.browsers.new('localhost:3000');

	setAccountData(accountData: string) {
		this.browser.call(CEF.Events.Auth.SetAccountData, accountData);
	}

	setPage(page: string) {
		this.browser.call(CEF.Events.PageManager.SetPage, page);
	}

	showGameUI(state: boolean) {
		mp.game.ui.displayRadar(state);
		mp.game.ui.displayHud(state);
	}

	success(text: string) {
		this.browser?.call(CEF.Events.Toast.Success, text);
	}

	info(text: string) {
		this.browser?.call(CEF.Events.Toast.Info, text);
	}

	error(text: string) {
		this.browser?.call(CEF.Events.Toast.Error, text);
	}

	warning(text: string) {
		this.browser?.call(CEF.Events.Toast.Warning, text);
	}
}
