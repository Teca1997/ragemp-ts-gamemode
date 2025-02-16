import 'reflect-metadata';

import { ModuleResolver } from '@utils';
import { AppModule } from 'app.module';

import './dataHandlers';
import './prototype';

mp.keys.bind(0x71, true, function () {
	if (mp.gui.cursor.visible) {
		mp.gui.cursor.show(false, false);
	} else {
		mp.gui.cursor.show(true, true);
	}
});

function bootstrap() {
	const appModuleInstance = ModuleResolver.resolve(AppModule);
	mp.console.logInfo('[BOOTSTRAP] Bootstrap done.');
}

bootstrap();
