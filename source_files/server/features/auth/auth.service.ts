import { Injectable } from '@nestjs/common';
import { AccountData, Config, RegisterFormValues } from '@shared';
import { instanceToPlain } from 'class-transformer';
import { Account } from 'db/entities/Account';
import { Like, Repository } from 'typeorm';
import { IPlayer } from 'utils/stubs';

import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(Account) private readonly accountRepo?: Repository<Account>) {}

	log(text: string) {
		console.log(text);
	}

	async login({
		username,
		password
	}: {
		username: string;
		password: string;
	}): Promise<{ account: AccountData | null; msgs: string[] }> {
		const account = await this.accountRepo?.findOne({
			where: { username: Like(username) }
		});
		if (account == null) {
			return {
				account: null,
				msgs: ['No account with username ' + username + ' found!']
			};
		} else {
			if (this.comparePasswords(password, account.password, account.salt)) {
				await this.accountRepo?.update({ username: Like(account.username) }, { lastLogin: new Date() });

				return {
					account: instanceToPlain(account) as AccountData,
					msgs: []
				};
			} else {
				{
					return {
						account: null,
						msgs: ['Wrong password!']
					};
				}
			}
		}
	}

	async register({ username, email, password }: RegisterFormValues): Promise<any> {
		const accounts = await this.accountRepo?.findBy({
			username: Like(username + '::VARCHAR'),
			email: Like(email + '::VARCHAR')
		});
		if (accounts!.length > 0) {
			return {
				success: false,
				msgs: ['Username or email already in use!']
			};
		} else {
			const { hash, salt } = this.hashPassword(password);
			const newAccount = new Account(username, email, hash, salt);
			await this.accountRepo?.save(newAccount);
			return {
				success: true,
				msgs: ['Username or email already in use!']
			};
		}
	}

	public async tpPlayerToAuthPos(player: IPlayer) {
		player.position = new mp.Vector3(Config.Auth.playerPosition as Vector3);
		player.dimension = Config.Auth.playerDimension;
	}

	public hashPassword(password: string) {
		const salt = crypto.randomBytes(32).toString('hex');
		const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
		return {
			salt,
			hash
		};
	}

	public comparePasswords(password: string, hash: string, salt: string): boolean {
		return hash === crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
	}
}
