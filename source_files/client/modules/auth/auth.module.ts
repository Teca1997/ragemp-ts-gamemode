import { Module, ModuleBase } from '@utils';
import { ControlsModule } from 'modules/controls/controls.module';
import { UIModule } from 'modules/ui/ui.module';
import { AuthEvents } from './auth.events';
import { AuthService } from './auth.service';

@Module({
	providers: [AuthService],
	events: [AuthEvents],
	imports: [UIModule, ControlsModule]
})
export class AuthModule extends ModuleBase {}
