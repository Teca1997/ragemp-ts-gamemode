import { Injectable } from '@nestjs/common';
import { Server } from '@shared';
import { MPEvent } from 'utils/decorators/event/Event.decorator';
import { IPlayer } from 'utils/stubs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEvents {
	constructor(private readonly authService: AuthService) {}

	@MPEvent()
	private playerReady(player: IPlayer) {
		this.authService!.tpPlayerToAuthPos(player);
	}

	@MPEvent({ name: Server.Events.Auth.Logout })
	private logout(player: IPlayer) {
		this.authService!.tpPlayerToAuthPos(player);
		player.ownData.account = undefined;
	}

	@MPEvent({ proc: true, name: Server.Events.Auth.Login })
	private async login(player: IPlayer, values: string): Promise<string> {
		try {
			const loginData = JSON.parse(values);
			const result = await this.authService?.login(loginData);
			console.log(result);

			if (result!.account) {
				player.ownData.account = result!.account;
			}
			return JSON.stringify({
				success: result!.account != null,
				msgs: result.msgs
			});
		} catch (error) {
			console.log(error);
			return JSON.stringify({
				success: false,
				msgs: ['Something went wrong. Report it to server administration!']
			});
		}
	}

	@MPEvent({ proc: true, name: Server.Events.Auth.Register })
	private async register(player: IPlayer, values: string): Promise<string> {
		try {
			const registrationData = JSON.parse(values);
			return JSON.stringify(await this.authService?.register(registrationData));
		} catch (error) {
			console.log(error);
			return JSON.stringify({
				success: false,
				msgs: ['Something went wrong. Report it to server administration!']
			});
		}
	}
}
