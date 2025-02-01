import { Account } from '../db/entities/Account';
import crypto from 'crypto';
import { yellow } from 'colorette';

export class AuthService {
	private static _instance: AuthService = new AuthService();

	private constructor() {
		mp.events.addProc('server:loginPlayer', this.loginPlayer);
		console.log(`${yellow('[INFO]')} Auth service started...`);
	}

	public static get instance(): AuthService {
		return AuthService._instance;
	}

	private async loginPlayer(player: PlayerMp, userInputPassword: string, account: Account): Promise<boolean> {
		if (!(await this.comparePasswords(userInputPassword, account.password, account.salt))) return false;

		player.account = account;
		return true;
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
