import { rayc } from 'raycasting';

const textScale = 0.5;
const textSpacing = 0.03;

let showEntityBeingLookedAtInfo = true;
let showPlayerInfo = true;

mp.events.add('render', () => {
	const target = rayc.getEntityBeingLookedAt();
	if (mp.keys.isDown(0x11) && mp.keys.isDown(0x48)) {
		mp.game.graphics.drawText(
			`
			Press CTRL+E to toggle entity info panel\n
			Press CTRL+P to toggle player info panel\n
			Press CTRL+B+LMB to add new roulette table\n
			Press CTRL+C+LMB to add new blackjack table\n
			`,
			[0.5, 0.05],
			{
				font: 0,
				color: [255, 255, 255, 255],
				scale: [textScale, textScale],
				outline: true,
				centre: true
			}
		);
		return;
	}
	if (showPlayerInfo) {
		mp.game.ui.showHudComponentThisFrame(14);
		mp.game.graphics.drawText(
			`Player coords: ${mp.players.local.position.x.toFixed(4)} ${mp.players.local.position.y.toFixed(4)} ${mp.players.local.position.z.toFixed(4)}`,
			[0.5, 0.05 + textSpacing * 0],
			{
				font: 0,
				color: [255, 255, 255, 255],
				scale: [textScale, textScale],
				outline: true
			}
		);

		mp.game.graphics.drawText(`Player heading: ${mp.players.local.getHeading().toFixed(4)}`, [0.5, 0.05 + textSpacing * 1], {
			font: 0,
			color: [255, 255, 255, 255],
			scale: [textScale, textScale],
			outline: true
		});
		let n = 0;
		for (let i = 0; i < 1000; i++) {
			if (mp.players.local.getIsTaskActive(i)) {
				mp.game.graphics.drawText(`Playing task: ${i}`, [0.9, 0.05 + 0.03 * n++], {
					font: 0,
					color: [255, 255, 255, 255],
					scale: [textScale, textScale],
					outline: true
				});
			}
		}
	}
	if (target != undefined && showEntityBeingLookedAtInfo) {
		const textSettings: any = {
			font: 0,
			color: [255, 255, 255, 255],
			scale: [0.3, 0.3],
			outline: true
		};
		const targetHandle = target.entity.handle == undefined ? target.entity : target.entity.handle;
		const objectPos = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_ENTITY_COORDS, targetHandle, true);
		const objectRot = mp.game.entity.getRotation(targetHandle, 2);
		const playerOffPos = mp.game.entity.getOffsetFromGivenWorldCoords(targetHandle, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z);

		mp.game.graphics.drawMarker(28, objectPos.x, objectPos.y, objectPos.z, 0, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, 0, 255, 0, 64, false, false, 2, false, null, null, false);
		mp.game.graphics.drawText(
			`
		Object model ${mp.game.entity.getModel(targetHandle)}
		Object pos x:${objectPos.x.toFixed(2)} y:${objectPos.y.toFixed(2)} z:${objectPos.z.toFixed(2)}
		`,
			[objectPos.x, objectPos.y, objectPos.z + 2],
			textSettings
		);

		mp.game.graphics.drawText(
			`
		Object rot: x:${objectRot.x.toFixed(2)} y:${objectRot.y.toFixed(2)} z:${objectRot.z.toFixed(2)}
		Player pos offset from object x:${playerOffPos.x.toFixed(2)} y:${playerOffPos.y.toFixed(2)} z:${playerOffPos.z.toFixed(2)}
		`,
			[objectPos.x, objectPos.y, objectPos.z + 2 - 0.35],
			textSettings
		);
	}
});

//ctrl + e
mp.keys.bind(0x45, true, function () {
	if (mp.keys.isDown(0x11)) {
		showEntityBeingLookedAtInfo = !showEntityBeingLookedAtInfo;
	}
});
//ctrl + p
mp.keys.bind(0x50, true, function () {
	if (mp.keys.isDown(0x11)) {
		showPlayerInfo = !showPlayerInfo;
	}
});

//ctrl + b + lmb
mp.events.add('click', async (_x, _y, upOrDown, _leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
	if (_hitEntity != 0) return;

	if (_leftOrRight == 'left' && _hitEntity == 0 && upOrDown == 'up' && mp.keys.isDown(0x11)) {
		let animDict = '';
		let animName = '';
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
		const position = mp.game.invokeVector3(RageEnums.Natives.ENTITY.GET_ENTITY_COORDS, target.entity.handle == undefined ? target.entity : target.entity.handle, false);
		let rotation = mp.game.invokeFloat(RageEnums.Natives.ENTITY.GET_ENTITY_HEADING, target.entity.handle == undefined ? target.entity : target.entity.handle, 2);
		var animPos = mp.game.ped.getAnimInitialOffsetPosition('anim_casino_b@amb@casino@games@roulette@dealer', 'idle', position.x, position.y, position.z, 0, 0, rotation, 0.01, 2);
		mp.gui.chat.push('table position: ' + JSON.stringify(position));
		mp.gui.chat.push('table rotation: ' + JSON.stringify(rotation));

		mp.events.callRemote(
			'consoleLogCasinoPed',
			JSON.stringify({
				position: animPos,
				headingOffset: rotation - 180
			})
		);

		let newPed = mp.peds.new(0x1422d45b, animPos, rotation + 180, 0);
		await mp.game.waitAsync(1000);
		newPed.taskPlayAnim(animDict, animName, 8.0, 1, -1, 514, 0.0, false, false, false);
		newPed.playFacialAnim('idle_facial', 'anim_casino_b@amb@casino@games@shared@dealer@');

		const boneCount = mp.game.invoke(RageEnums.Natives.ENTITY._GET_ENTITY_BONE_COUNT, target.entity.handle == undefined ? target.entity : target.entity.handle);
		mp.gui.chat.push('bone count ' + boneCount);
	}
});
