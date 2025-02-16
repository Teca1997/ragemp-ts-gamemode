import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ip } from '../../db/entities/Ip';
import { Serial } from '../../db/entities/Serial';
import { SocialClub } from '../../db/entities/SocialClub';

@Injectable()
export class PunishmentService {
	constructor(
		@InjectRepository(SocialClub) private readonly socialClubRepo?: Repository<SocialClub>,
		@InjectRepository(Serial) private readonly serialRepo?: Repository<Serial>,
		@InjectRepository(Ip) private readonly ipRepo?: Repository<Ip>
	) {}

	public async savePlayerIdentifiers(socialClub: string, serial: string, ip: string) {
		try {
			await this.socialClubRepo?.save(new SocialClub(socialClub));
			await this.serialRepo?.save(new Serial(serial));
			await this.ipRepo?.save(new Ip(ip));
		} catch (error) {
			console.log(error);
		}
	}
}
