import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterDeathLog } from '../../db/entities/CharacterDeathLog';

@Injectable()
export class DeathLogService {
	constructor(
		@InjectRepository(CharacterDeathLog) private readonly characterDeathLogRepo?: Repository<CharacterDeathLog>
	) {}

	async saveDeathLog(victimCharId: number, reason: number, killercharId: number | null = null) {
		const deathLog = new CharacterDeathLog(victimCharId, null, reason);
		await this.characterDeathLogRepo?.save(deathLog);
	}
}
