import { UIService } from '../services/ui';

mp.events.addDataHandler('account', (entity: EntityMp, value: string, oldValue: string) => {
	mp.console.logInfo('account data set');
	if (entity.type == 'player') {
		UIService.instance.setAccountData(value);
	}
});
