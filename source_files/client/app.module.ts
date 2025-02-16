import { Module, ModuleBase } from '@utils';
import { AuthModule } from 'modules/auth/auth.module';
import { CharacterCreatorModule } from 'modules/characterCreator/characterCreator.module';
import { CharacterSelectorModule } from 'modules/characterSelector/chracterSelector.module';

@Module({ imports: [AuthModule, CharacterCreatorModule, CharacterSelectorModule] })
export class AppModule extends ModuleBase {}
