import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CharacterCreatorModule } from './characterCreator/charatcterCreator.module';
import { CharacterSelectorModule } from './characterSelector/characterSelector.module';
import { CommandProcessorModule } from './commandProcessor/commandProcessor.module';
import { DeathLogModule } from './deathLog/deathLod.module';
import { PunishmentModule } from './punishment/punishment.module';

@Module({
	providers: [],
	imports: [
		AuthModule,
		CharacterCreatorModule,
		CharacterSelectorModule,
		CommandProcessorModule,
		DeathLogModule,
		PunishmentModule
	]
})
export class FeaturesModule {}
