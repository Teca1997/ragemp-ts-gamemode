import 'systems/dev_tools/animation_tester';
import 'systems/dev_tools/dev_interaction_menu';

import { DevHud } from 'systems/dev_tools/hud';
import { Fly } from 'systems/dev_tools/fly';

const gameplayCam = mp.cameras.new('gameplay');

mp.events.add('render', () => {
	Fly.render(gameplayCam);
	DevHud.render(gameplayCam);
});

//ctrl + b + lmb
mp.events.add('click', async (_x, _y, upOrDown, _leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
	if (_hitEntity != 0) return;

	if (_leftOrRight == 'left' && _hitEntity == 0 && upOrDown == 'up' && mp.keys.isDown(0x11)) {
		var animDict = '';
		var animName = '';
		mp.gui.chat.push('');
		const target: any = mp.raycasting.testCapsule(mp.players.local.getBoneCoords(12844, 0.5, 0, 0), _worldPosition, 1.2, mp.players.local, 18);
		if (target == undefined) return;
		if (mp.keys.isDown(0x42)) {
			mp.gui.chat.push('Created blackjack ped and console logged his data');
			animDict = 'anim_casino_b@amb@casino@games@blackjack@dealer';
			animName = 'retrieve_own_cards_and_remove';
		} else if (mp.keys.isDown(0x52)) {
			mp.gui.chat.push('Created blackjack ped and console logged his data');
			animDict = 'anim_casino_b@amb@casino@games@roulette@dealer';
			animName = 'spin_wheel';
		}
		if (animDict == '' || animName == '') return;
		const position = mp.game.invokeVector3(
			RageEnums.Natives.ENTITY.GET_ENTITY_COORDS,
			target.entity.handle == undefined ? target.entity : target.entity.handle,
			false
		);
		var rotation = mp.game.invokeFloat(
			RageEnums.Natives.ENTITY.GET_ENTITY_HEADING,
			target.entity.handle == undefined ? target.entity : target.entity.handle,
			2
		);
		var animPos = mp.game.ped.getAnimInitialOffsetPosition(
			'anim_casino_b@amb@casino@games@roulette@dealer',
			'idle',
			position.x,
			position.y,
			position.z,
			0,
			0,
			rotation,
			0.01,
			2
		);
		mp.gui.chat.push('table position: ' + JSON.stringify(position));
		mp.gui.chat.push('table rotation: ' + JSON.stringify(rotation));

		mp.events.callRemote(
			'consoleLogCasinoPed',
			JSON.stringify({
				position: animPos,
				headingOffset: rotation - 180
			})
		);

		var newPed = mp.peds.new(0x1422d45b, animPos, rotation + 180, 0);
		await mp.game.waitAsync(1000);
		newPed.taskPlayAnim(animDict, animName, 8.0, 1, -1, 514, 0.0, false, false, false);
		newPed.playFacialAnim('idle_facial', 'anim_casino_b@amb@casino@games@shared@dealer@');

		const boneCount = mp.game.invoke(
			RageEnums.Natives.ENTITY._GET_ENTITY_BONE_COUNT,
			target.entity.handle == undefined ? target.entity : target.entity.handle
		);
		mp.gui.chat.push('bone count ' + boneCount);
	}
});
