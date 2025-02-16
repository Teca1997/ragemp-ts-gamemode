import { Module, ModuleBase } from '@utils';
import { ControlsService } from './controls.service';

@Module({
	exports: [ControlsService],
	providers: [ControlsService]
})
export class ControlsModule extends ModuleBase {}
