import { Server, Types, Variables } from '@shared';

import { yellow } from 'colorette';
import crypto from 'crypto';
import { Like } from 'typeorm';
import { ServerConfig } from '../config';
import { Database } from '../db';
import { Account } from '../db/entities/Account';
import { Character } from '../db/entities/Character';

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
		player.position = ServerConfig.Auth.playerPosition;
		player.dimension = ServerConfig.Auth.playerDimension;
	}

	private logout(player: PlayerMp) {
		this.playerReady(player);
		player.account = null;
	}

	private async login(player: PlayerMp, values: string): Promise<string> {
		const { username, password }: Types.LoginFormValues = JSON.parse(values);

		try {
			const account = await Database.datasource.getRepository(Account).findOne({
				where: { username: Like(username) }
			});
			if (account == null) {
				return JSON.stringify({
					account: null,
					msgs: ['No account with username ' + username + ' found!']
				});
			} else {
				if (this.comparePasswords(password, account.password, account.salt)) {
					await Database.datasource
						.getRepository(Account)
						.update({ username: Like(account.username) }, { lastLogin: new Date() });
					const { username, email, role, characters } = account;

					player.account = account;
					player.setOwnVariable(Variables.Player.Account, player.account);
					player.account!.characters![0].position.location = new mp.Vector3(
						-241.94448852539062,
						6325.61865234375,
						32.426177978515625
					);
					player.account!.characters![1].position.location = new mp.Vector3(
						-241.94448852539062,
						6325.61865234375,
						32.426177978515625
					);
					player.account!.characters![2].position.location = new mp.Vector3(
						-241.94448852539062,
						6325.61865234375,
						32.426177978515625
					);
					await Database.datasource
						.getRepository(Character)
						.save(player.account!.characters![0]);
					await Database.datasource
						.getRepository(Character)
						.save(player.account!.characters![1]);
					await Database.datasource
						.getRepository(Character)
						.save(player.account!.characters![2]);
					return JSON.stringify({
						account: {
							username,
							email,
							role,
							characters
						},
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
		const { username, email, password, repeatPassword }: Types.RegisterFormValues =
			JSON.parse(values);

		try {
			const accounts = await Database.datasource.getRepository(Account).findBy({
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
				await Database.datasource.getRepository(Account).save(newAccount);
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
