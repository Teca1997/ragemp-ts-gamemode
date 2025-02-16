import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterDeathLog } from 'db/entities/CharacterDeathLog';
import { DeathLogEvents } from './deathLog.events';
import { DeathLogService } from './deathLog.service';

@Module({
	imports: [TypeOrmModule.forFeature([CharacterDeathLog])],
	providers: [DeathLogService, DeathLogEvents],
	exports: [DeathLogService]
})
export class DeathLogModule {}
