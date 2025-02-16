import { Module, ModuleBase } from '@utils';
import { UIModule } from 'modules/ui/ui.module';
import { CharacterCreatorEvents } from './characterCreator.events';
import { CharacterCreatorService } from './characterCreator.service';

@Module({
	imports: [UIModule],
	providers: [CharacterCreatorService],
	events: [CharacterCreatorEvents]
})
export class CharacterCreatorModule extends ModuleBase {}
