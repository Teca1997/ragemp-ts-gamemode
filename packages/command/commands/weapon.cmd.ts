import { Command } from '../command';

export class WeaponCommand extends Command {
	alias: string = 'weapon';

	process(player: PlayerMp, cmd: string): void {
		if (cmd[0] == undefined) return;
		player.giveWeapon(RageEnums.Hashes.Weapon.APPISTOL, 1000);
	}
}
