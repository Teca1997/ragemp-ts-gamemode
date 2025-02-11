import { AccountData, Config, RegisterFormValues, Server } from '@shared';

import { instanceToPlain } from 'class-transformer';
import { yellow } from 'colorette';
import crypto from 'crypto';
import { Like } from 'typeorm';
import { Database } from '../../db';
import { Account } from '../../db/entities/Account';

export class AuthService {
	private static _instance: AuthService = new AuthService();

	private constructor() {
		mp.events.addProc(Server.Events.Auth.Login, this.login.bind(this));
		mp.events.addProc(Server.Events.Auth.Register, this.register.bind(this));
		mp.events.add(Server.Events.Auth.Logout, this.logout.bind(this));
		mp.events.add('playerReady', this.playerReady.bind(this));
		console.log(`${yellow('[INFO]')} Auth service started...`);
	}

	public static get instance(): AuthService {
		return AuthService._instance;
	}

	private playerReady(player: PlayerMp) {
		player.position = new mp.Vector3(Config.Auth.playerPosition as Vector3);
		player.dimension = Config.Auth.playerDimension;
	}

	private logout(player: PlayerMp) {
		this.playerReady(player);
	}

	private async login(player: PlayerMp, values: string): Promise<string> {
		const { username, password } = JSON.parse(values);

		try {
			const account = await Database.getRepository(Account).findOne({
				where: { username: Like(username) }
			});
			if (account == null) {
				return JSON.stringify({
					account: null,
					msgs: ['No account with username ' + username + ' found!']
				});
			} else {
				if (this.comparePasswords(password, account.password, account.salt)) {
					await Database.getRepository(Account).update(
						{ username: Like(account.username) },
						{ lastLogin: new Date() }
					);
					//sets objects property of account and also does .setOwnVariable of stringified object
					player.ownData.account = instanceToPlain(account) as AccountData;

					console.log(player.ownData.account);

					return JSON.stringify({
						account,
						msgs: []
					});
				} else {
					{
						return JSON.stringify({
							account: null,
							msgs: ['Wrong password!']
						});
					}
				}
			}
		} catch (error) {
			console.log(error);
			return JSON.stringify({
				account: null,
				msgs: ['Something went wrong. Report it to server administration!!']
			});
		}
	}

	private async register(player: PlayerMp, values: string): Promise<string> {
		const { username, email, password, repeatPassword }: RegisterFormValues =
			JSON.parse(values);

		try {
			const accounts = await Database.getRepository(Account).findBy({
				username: Like(username + '::VARCHAR'),
				email: Like(email + '::VARCHAR')
			});
			if (accounts.length > 0) {
				return JSON.stringify({
					success: false,
					msgs: ['Username or email already in use!']
				});
			} else {
				const { hash, salt } = this.hashPassword(password);
				const newAccount = new Account(username, email, hash, salt);
				await Database.getRepository(Account).save(newAccount);
				return JSON.stringify({
					success: true,
					msgs: ['Username or email already in use!']
				});
			}
		} catch (error) {
			console.log(error);
			return JSON.stringify({
				success: false,
				msgs: ['Something went wrong. Report it to server administration!']
			});
		}
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
