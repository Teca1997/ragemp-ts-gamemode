import { CEF, Client, Server } from '@shared';

import { MPEvent } from '@utils';
import { ControlsService } from 'modules/controls/controls.service';
import { PlayerService } from 'modules/player/player.service';
import { UIService } from 'modules/ui/ui.service';
import { singleton } from 'tsyringe';
import { CharacterSelectorService } from './charcterSelector.service';

@singleton()
export class CharacterSelectorEvents {
	constructor(
		private characterSelectorService: CharacterSelectorService,
		private playerService: PlayerService,
		private controlsService: ControlsService,
		private uiService: UIService
	) {
		mp.console.logInfo('[Client] Character selector started');
	}

	@MPEvent({ name: Client.Events.CharacterSelector.ApplyCharacter })
	private applyCharacter(index: number) {
		this.playerService.applyCharacter(mp.players.local.ownData.account!.characters![index]);
	}

	@MPEvent({ name: Client.Events.CharacterSelector.Start })
	private start() {
		if (mp.players.local.ownData.account!.characters!.length !== 0) {
			this.playerService.applyCharacter(mp.players.local.ownData.account!.characters![0]);
		}
		this.uiService.setPage(CEF.Pages.CharacterSelector);
		this.characterSelectorService.start();
	}

	@MPEvent({ name: Client.Events.CharacterSelector.Play })
	private async play(characterIndex: number) {
		mp.events.callRemote(Server.Events.CharaterSelector.Play, characterIndex);
		this.controlsService.allControlActionsState = true;
		this.uiService.showGameUI(true);
		mp.gui.chat.show(true);
		mp.gui.cursor.show(false, false);
		mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
		this.uiService.setPage(CEF.Pages.Hud);
	}
}
