import { UIService } from 'modules/ui/ui.service';
import { container } from 'tsyringe';

mp.events.addDataHandler('account', (entity: EntityMp, value: string, oldValue: string) => {
	if (entity.type == 'player') {
		const uiService = container.resolve(UIService);
		uiService.setAccountData(value);
	}
});
