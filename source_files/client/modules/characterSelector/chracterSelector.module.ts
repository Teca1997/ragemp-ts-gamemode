import { Module, ModuleBase } from '@utils';
import { ControlsModule } from 'modules/controls/controls.module';
import { PlayerModule } from 'modules/player/player.module';
import { UIModule } from 'modules/ui/ui.module';
import { CharacterSelectorEvents } from './charcterSelector.events';

@Module({
	exports: [],
	imports: [UIModule, ControlsModule, PlayerModule],
	events: [CharacterSelectorEvents]
})
export class CharacterSelectorModule extends ModuleBase {}
