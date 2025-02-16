import { MPEvent } from '@utils';
import { injectable } from 'tsyringe';
import { UIService } from './ui.service';

@injectable()
export class UIEvents {
	constructor(private uiService: UIService) {}

	@MPEvent({})
	private playerReady() {
		this.uiService.showGameUI(false);
		mp.gui.chat.show(false);
	}
}
