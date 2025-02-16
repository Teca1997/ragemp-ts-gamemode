import { Module, ModuleBase } from '@utils';
import { PlayerEvents } from './player.events';
import { PlayerService } from './player.service';

@Module({
	exports: [PlayerService],
	providers: [PlayerService],
	events: [PlayerEvents]
})
export class PlayerModule extends ModuleBase {}
