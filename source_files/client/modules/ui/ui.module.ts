import { Module, ModuleBase } from '@utils';
import { UIEvents } from './ui.events';
import { UIService } from './ui.service';

@Module({
	providers: [UIService],
	exports: [UIService],
	events: [UIEvents]
})
export class UIModule extends ModuleBase {}
