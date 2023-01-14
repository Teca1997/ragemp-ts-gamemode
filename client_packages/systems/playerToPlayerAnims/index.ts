import { Menu } from 'interaction_menu_API/menu';
import { MenuManager } from 'interaction_menu_API/manager';
import { rayc } from 'systems/raycasting';

let target: PedMp | PlayerMp | undefined;
const devPlayerToPlayerAnimMenu = new Menu(8, 5, 6.5, 0.1, [145, 205, 245, 155], [145, 205, 245, 255], ...Array(2)); // Declare a new menu with the last 2 parameters set to default
const devPlayerToPlayerAnimMenuManager = new MenuManager(devPlayerToPlayerAnimMenu);

devPlayerToPlayerAnimMenu.add('Standing/front', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), async () => {
	try {
		var data = {
			players: [
				{
					id: mp.players.local.remoteId,
					anims: [
						{
							pos: mp.players.local.position,
							rot: new mp.Vector3(0, 0, mp.players.local.getHeading()),
							animDict: 'misscarsteal2pimpsex',
							animName: 'shagloop_pimp',
							animSpeed: 1,
							animSpeedMult: 2,
							animDuration: -1,
							animFlag: 1 + 512,
							animTime: 0,
							animRotOrder: 0,
							animIkFlags: 2
						}
					]
				},
				{
					id: target?.remoteId,
					anims: [
						{
							pos: mp.game.entity.getOffsetFromInWorldCoords(mp.players.local.handle, 0, 0.3567, -0.1),
							rot: new mp.Vector3(0, 0, mp.players.local.getHeading() + 180),
							animDict: 'misscarsteal2pimpsex',
							animName: 'shagloop_hooker',
							animSpeed: 1,
							animSpeedMult: 2,
							animDuration: -1,
							animFlag: 1 + 512,
							animTime: 0,
							animRotOrder: 0,
							animIkFlags: 2
						}
					]
				}
			]
		};
		mp.events.callRemote('playPlayerToPlayerAnim', JSON.stringify(data));
	} catch (error) {
		mp.gui.chat.push('error' + error);
	}
});

devPlayerToPlayerAnimMenu.add('Doggy', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), async () => {
	var data = {
		players: [
			{
				id: mp.players.local.remoteId,
				anims: [
					{
						pos: mp.players.local.position,
						rot: new mp.Vector3(0, 0, mp.players.local.getHeading()),
						animDict: 'rcmpaparazzo_2',
						animName: 'shag_loop_a',
						animSpeed: 1,
						animSpeedMult: 2,
						animDuration: -1,
						animFlag: 1 + 512,
						animTime: 0,
						animRotOrder: 0,
						animIkFlags: 2
					}
				]
			},
			{
				id: target?.remoteId,
				anims: [
					{
						pos: mp.game.entity.getOffsetFromInWorldCoords(mp.players.local.handle, -0.01, 0.25, -0.1),
						rot: new mp.Vector3(0, 0, mp.players.local.getHeading()),
						animDict: 'rcmpaparazzo_2',
						animName: 'shag_loop_poppy',
						animSpeed: 1,
						animSpeedMult: 2,
						animDuration: -1,
						animFlag: 1 + 512,
						animTime: 0,
						animRotOrder: 0,
						animIkFlags: 2
					}
				]
			}
		]
	};
	mp.events.callRemote('playPlayerToPlayerAnim', JSON.stringify(data));
});

devPlayerToPlayerAnimMenu.add('Cowgirl', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), async () => {
	var data = {
		players: [
			{
				id: mp.players.local.remoteId,
				anims: [
					{
						pos: mp.players.local.position,
						rot: new mp.Vector3(0, 0, mp.players.local.getHeading()),
						animDict: 'mini@prostitutes@sexnorm_veh',
						animName: 'sex_loop_male',
						animSpeed: 1,
						animSpeedMult: 2,
						animDuration: -1,
						animFlag: 1 + 512,
						animTime: 0,
						animRotOrder: 0,
						animIkFlags: 2
					}
				]
			},
			{
				id: target?.remoteId,
				anims: [
					{
						pos: mp.game.entity.getOffsetFromInWorldCoords(mp.players.local.handle, 0.85, 0.1, 0),
						rot: new mp.Vector3(0, 0, mp.players.local.getHeading()),
						animDict: 'mini@prostitutes@sexnorm_veh',
						animName: 'sex_loop_prostitute',
						animSpeed: 1,
						animSpeedMult: 2,
						animDuration: -1,
						animFlag: 1 + 512,
						animTime: 0,
						animRotOrder: 0,
						animIkFlags: 2
					}
				]
			}
		]
	};
	mp.events.callRemote('playPlayerToPlayerAnim', JSON.stringify(data));
});

devPlayerToPlayerAnimMenu.add('Cowgirl reverse', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), async () => {
	var data = {
		players: [
			{
				id: mp.players.local.remoteId,
				anims: [
					{
						pos: mp.players.local.position,
						rot: new mp.Vector3(0, 0, mp.players.local.getHeading()),
						animDict: 'mini@prostitutes@sexnorm_veh',
						animName: 'sex_loop_male',
						animSpeed: 1,
						animSpeedMult: 2,
						animDuration: -1,
						animFlag: 1 + 512,
						animTime: 0,
						animRotOrder: 0,
						animIkFlags: 2
					}
				]
			},
			{
				id: target?.remoteId,
				anims: [
					{
						pos: mp.game.entity.getOffsetFromInWorldCoords(mp.players.local.handle, -0.85, 0.4, 0),
						rot: new mp.Vector3(0, 0, mp.players.local.getHeading() + 180),
						animDict: 'mini@prostitutes@sexnorm_veh',
						animName: 'sex_loop_prostitute',
						animSpeed: 1,
						animSpeedMult: 2,
						animDuration: -1,
						animFlag: 1 + 512,
						animTime: 0,
						animRotOrder: 0,
						animIkFlags: 2
					}
				]
			}
		]
	};
	mp.events.callRemote('playPlayerToPlayerAnim', JSON.stringify(data));
});

devPlayerToPlayerAnimMenu.add('test', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), async () => {
	mp.game.streaming.requestAnimDict('mini@prostitutes@sexnorm_veh');
	mp.game.streaming.requestAnimDict('mp_arresting');

	mp.players.local.taskPlayAnim('mini@prostitutes@sexnorm_veh', 'sex_loop_prostitute', 1, 2, -1, 2, 0, false, false, false);
	mp.players.local.taskPlayAnim('mp_arresting', 'idle', 1, 2, -1, 1 + 16 + 32 + 524288, 0, false, false, false);
});

const PlayerToPlayerAnimInteractKey = 0x42; //Q
mp.keys.bind(PlayerToPlayerAnimInteractKey, true, () => {
	if (mp.players.local.getVariable('playerToPlayerAnimData')) {
		try {
			mp.events.callRemote('cancelPlayerToPlayerAnim');
		} catch (error) {
			mp.gui.chat.push('error' + error);
		}
		return;
	}
	const targetEntity = rayc.getEntityBeingLookedAt();
	if (targetEntity == undefined) return;
	if (targetEntity.entity.handle == undefined) return;
	if (targetEntity.entity.type == undefined) return;
	if (targetEntity.entity.type != 'player') return;
	target = targetEntity.entity;
	devPlayerToPlayerAnimMenuManager.display(true);
	mp.gui.cursor.show(true, true);
	mp.gui.cursor.position = [0.5, 0.5];
});
mp.keys.bind(PlayerToPlayerAnimInteractKey, false, () => {
	mp.gui.cursor.show(false, false);
	devPlayerToPlayerAnimMenuManager.display(false);
	target = undefined;
});

mp.events.add('render', () => {
	devPlayerToPlayerAnimMenuManager.render();
});

mp.events.add('click', (_x, _y, upOrDown, leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
	if (leftOrRight == 'left' && upOrDown == 'down') devPlayerToPlayerAnimMenuManager.select();
});

mp.events.addDataHandler('playerToPlayerAnimData', async (entity: PlayerMp, value: any) => {
	mp.gui.chat.push('data changed');
	if (entity.type != 'player') return;

	if (value == undefined) {
		entity.clearTasksImmediately();
		return;
	}
	const animData = JSON.parse(value);

	animData.players.forEach((p: any) => {
		mp.gui.chat.push('scene set for ' + p.id);
		p.anims.forEach(async (anim: any) => {
			if (!mp.game.streaming.hasAnimDictLoaded(anim.animDict)) {
				do {
					mp.game.streaming.requestAnimDict(anim.animDict);
					await mp.game.waitAsync(10);
				} while (!mp.game.streaming.hasAnimDictLoaded(anim.animDict));
			}
			mp.players
				.atRemoteId(p.id)
				.taskPlayAnimAdvanced(
					anim.animDict,
					anim.animName,
					anim.pos.x,
					anim.pos.y,
					anim.pos.z,
					anim.rot.x,
					anim.rot.y,
					anim.rot.z,
					anim.animSpeed,
					anim.animSpeedMult,
					anim.animDuration,
					anim.animFlag,
					anim.animTime,
					anim.animRotOrder,
					anim.animIkFlags
				);
		});
	});

	await mp.game.waitAsync(1000);
	if (animData.players[0].id == entity.remoteId) {
		const { x, y, z } = mp.players.atRemoteId(animData.players[1].id).position;
		var offset = mp.players.local.getOffsetFromGivenWorldCoords(x, y, z);
		mp.gui.chat.push('offset ' + JSON.stringify(offset));
	}
});
