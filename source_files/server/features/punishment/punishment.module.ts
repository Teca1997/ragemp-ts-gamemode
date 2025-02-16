import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ip } from 'db/entities/Ip';
import { Serial } from 'db/entities/Serial';
import { SocialClub } from 'db/entities/SocialClub';
import { PunishmentEvents } from './punishment.events';
import { PunishmentService } from './punishment.service';

@Module({
	imports: [TypeOrmModule.forFeature([SocialClub, Serial, Ip])],
	providers: [PunishmentService, PunishmentEvents],
	exports: [PunishmentService]
})
export class PunishmentModule {}
