import { CEF, CharacterHair, Client, defaultFemaleCharacter, defaultMaleCharacter } from '@shared';
import { MPEvent } from '@utils';
import { PlayerService } from 'modules/player/player.service';
import { UIService } from 'modules/ui/ui.service';
import { singleton } from 'tsyringe';
import { CharacterCreatorService } from './characterCreator.service';

@singleton()
export class CharacterCreatorEvents {
	constructor(
		private characterCreatorService?: CharacterCreatorService,
		private uiService?: UIService,
		private playerService?: PlayerService
	) {
		mp.console.logInfo('[Client] Character creator started');
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateHairColor })
	updateHairColor(data: string) {
		const { color, highlightColor }: CharacterHair = JSON.parse(data);
		this.characterCreatorService?.updateHairColor({ color, highlightColor });
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateComponentVariation })
	updateComponentVariation(data: string) {
		this.characterCreatorService?.updateComponentVariation(JSON.parse(data));
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateFaceFeature })
	updateFaceFeature(data: string) {
		this.characterCreatorService?.updateFaceFeature(JSON.parse(data));
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateHeadOverlay })
	updateHeadOverlay(data: string) {
		this.characterCreatorService?.updateHeadOverlay(JSON.parse(data));
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateFirstName })
	updateFirstName(firstName: string) {
		this.characterCreatorService?.updateFirstName(firstName);
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateLastName })
	updateLastName(lastName: string) {
		this.characterCreatorService?.updateLastName(lastName);
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateGender })
	updateGender(gender: number) {
		this.characterCreatorService?.updateGender(gender);
		this.playerService?.applyCharacter(gender == 0 ? defaultFemaleCharacter : defaultMaleCharacter);
	}

	@MPEvent({ name: Client.Events.CharacterCreator.UpdateParents })
	updateParents(data: string) {
		const parents = JSON.parse(data);
		this.characterCreatorService?.updateParents(parents);
		this.playerService?.setParents(JSON.parse(data));
	}

	@MPEvent({ name: Client.Events.CharacterCreator.Save, proc: true })
	async save() {
		return await this.characterCreatorService?.save();
	}

	@MPEvent({ name: Client.Events.CharacterCreator.Start })
	start() {
		this.uiService?.setPage(CEF.Pages.CharacterCreator);
		this.characterCreatorService?.start();
		this.playerService?.applyCharacter(defaultMaleCharacter);
	}

	@MPEvent({ name: Client.Events.CharacterCreator.GetNumOfComVarPermutions, proc: true })
	private getNumOfComVarPermutions(componentId: number) {
		const numOfComDrawables = mp.players.local.getNumberOfDrawableVariations(componentId);
		const numOfTexturesPerDrawable = [];
		for (let index = 0; index < numOfComDrawables; index++) {
			numOfTexturesPerDrawable.push(mp.players.local.getNumberOfTextureVariations(componentId, index));
		}

		return JSON.stringify(numOfTexturesPerDrawable);
	}

	@MPEvent({ name: Client.Events.CharacterCreator.GetNumHeadOverlayValues, proc: true })
	private getNumHeadOverlayValues(overlayId: number) {
		return mp.game.ped.getNumHeadOverlayValues(overlayId);
	}
}
