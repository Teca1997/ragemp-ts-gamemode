import { CEF, Types } from '@shared';

export class UIService {
	private static _instance: UIService = new UIService();

	public static get instance(): UIService {
		return this._instance;
	}
	//mp.browsers.new('http://package2/ui/index.html');
	private browser: BrowserMp = mp.browsers.new('localhost:3000');

	private constructor() {
		mp.events.add('playerReady', this.playerReady.bind(this));
		mp.console.logInfo('[INFO] UI service started...');
	}

	private playerReady() {
		this.showGameUI(false);
		mp.gui.chat.show(false);
	}

	setCharacterData(data: Types.PlayerServiceData) {
		this.browser.call(CEF.Events.CharacterCreator.SetCharacterData, JSON.stringify(data));
	}

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
