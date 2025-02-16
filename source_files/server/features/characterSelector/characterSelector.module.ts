import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'db/entities/Character';
import { CharacterSelectorEvents } from './charaterSelector.events';
import { CharacterSelectorService } from './charaterSelector.service';

@Module({
	imports: [TypeOrmModule.forFeature([Character])],
	providers: [CharacterSelectorService, CharacterSelectorEvents],
	exports: [CharacterSelectorService]
})
export class CharacterSelectorModule {}
