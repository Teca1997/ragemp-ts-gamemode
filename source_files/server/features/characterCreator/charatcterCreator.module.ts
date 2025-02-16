import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'db/entities/Character';
import { CharacterCreatorEvents } from './characterCreator.events';
import { CharacterCreatorService } from './characterCreator.service';

@Module({
	imports: [TypeOrmModule.forFeature([Character])],
	providers: [CharacterCreatorService, CharacterCreatorEvents],
	exports: [CharacterCreatorService]
})
export class CharacterCreatorModule {}
