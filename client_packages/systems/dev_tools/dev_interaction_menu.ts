import { femaleNoClothes, interactionMenuPedComponents, maleNoClothes } from 'systems/dev_tools/config/interactionMenuPedComponents';

import { DevHud } from 'systems/dev_tools/hud';
import { Menu } from 'interaction_menu_API/menu';
import { MenuManager } from 'interaction_menu_API/manager';
import { devMenuWeapons } from 'systems/dev_tools/config/interationMenuWeapons';

let hasComponent = [true, true, true, true, true, true, true, true, true, true, true, true];

//main menu
const devMainMenu = new Menu(8, 5, 6.5, 0.1, [145, 205, 245, 155], [145, 205, 245, 255], ...Array(2)); // Declare a new menu with the last 2 parameters set to default
const DevMenuManager = new MenuManager(devMainMenu);
devMainMenu.add('Toggle Dev HUD components', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevMenuManager.switch(devHudSubMenu);
});
devMainMenu.add('Spawn weapons', 'commonmenu', 'shop_ammo_icon_a', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevMenuManager.switch(devWeaponSubMenu);
});
devMainMenu.add('Ped options', 'mpmissmarkers256', 'last_team_standing_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevMenuManager.switch(devPedSubMenu);
});
//main menu

//hud sub menu
const devHudSubMenu = new Menu(8, 5, 6.5, 0.1, [245, 205, 145, 155], [245, 205, 145, 255], ...Array(2));
devHudSubMenu.add('Back to main menu', 'commonmenu', 'shop_box_cross', false, false, [245, 205, 145, 255], [255, 75, 45, 255], () => {
	DevMenuManager.switch(devMainMenu);
});
devHudSubMenu.add('Toggle Gameplay Cam Coords', 'mpmissmarkers256', 'custom_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevHud.toggleHUDComponent('gameplay_cam_coordinates');
});
devHudSubMenu.add('Toggle Pointing At Position 3D', 'mpmissmarkers256', 'custom_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevHud.toggleHUDComponent('pointing_at_position_3d');
});
devHudSubMenu.add('Toggle Player Coordinates', 'mpmissmarkers256', 'custom_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevHud.toggleHUDComponent('player_coordinates');
});
devHudSubMenu.add('Toggle Player Heading', 'mpmissmarkers256', 'custom_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevHud.toggleHUDComponent('player_heading');
});
devHudSubMenu.add('Toggle Player Tasks Being Player', 'mpmissmarkers256', 'custom_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevHud.toggleHUDComponent('player_tasks_being_played');
});
devHudSubMenu.add('Toggle Object Being Looked At Info', 'mpmissmarkers256', 'custom_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevHud.toggleHUDComponent('object_being_looked_at_info');
});
devHudSubMenu.add('Toggle Reticle', 'mpmissmarkers256', 'custom_icon', false, false, ...(Array(2) as [RGBA, RGBA]), () => {
	DevHud.toggleHUDComponent('reticle');
});
//hud sub menu

//weapon sub menu
const devWeaponSubMenu = new Menu(20, 5, 6.5, 0.2, [245, 205, 145, 155], [245, 205, 145, 255], ...Array(2));
devWeaponSubMenu.add('Back to main menu', 'commonmenu', 'shop_box_cross', false, false, [245, 205, 145, 255], [255, 75, 45, 255], () => {
	DevMenuManager.switch(devMainMenu);
});
devMenuWeapons.forEach((_weapon) => {
	devWeaponSubMenu.add(_weapon.weaponName, _weapon.textureDict, _weapon.texture, false, false, [0, 0, 0, 155], [0, 0, 0, 255], () => {
		mp.events.callRemote('givePlayerWeapon', _weapon.weaponName);
	});
});
//weapon sub menu

//ped sub menu
const devPedSubMenu = new Menu(20, 5, 6.5, 0.2, [245, 205, 145, 155], [245, 205, 145, 255], ...Array(2));
devPedSubMenu.add('Back to main menu', 'commonmenu', 'shop_box_cross', false, false, [245, 205, 145, 255], [255, 75, 45, 255], () => {
	DevMenuManager.switch(devMainMenu);
});
devPedSubMenu.add('Toggle ped clothes', 'commonmenu', 'shop_clothing_icon_a', false, false, [245, 205, 145, 255], [255, 75, 45, 255], () => {
	DevMenuManager.switch(devPedSubMenuToggleClothes);
});
devPedSubMenu.add('Change freemode ped model', 'mptshirtawardlts', 'elitas_tshirt', false, false, [245, 205, 145, 255], [255, 75, 45, 255], () => {
	switch (mp.players.local.getModel()) {
		case mp.game.joaat('mp_f_freemode_01'):
			mp.game.joaat('mp_m_freemode_01');
			break;
		case mp.game.joaat('mp_m_freemode_01'):
			mp.game.joaat('mp_f_freemode_01');
			break;
		default:
			mp.gui.chat.push('Only allowed on freemode peds');
	}
});

const devPedSubMenuToggleClothes = new Menu(13, 5, 6.5, 0.2, [245, 205, 145, 155], [245, 205, 145, 255], ...Array(2));
devPedSubMenuToggleClothes.add('Back to ped menu', 'commonmenu', 'shop_box_cross', false, false, [245, 205, 145, 255], [255, 75, 45, 255], () => {
	DevMenuManager.switch(devPedSubMenu);
});
interactionMenuPedComponents.forEach((component, index) => {
	devPedSubMenuToggleClothes.add('Toggle ' + component + ' commponent', 'commonmenu', 'shop_clothing_icon_b', false, false, [245, 205, 145, 255], [255, 75, 45, 255], async () => {
		if (!mp.players.local.isModel(mp.game.joaat('mp_f_freemode_01')) && mp.players.local.isModel(mp.game.joaat('mp_m_freemode_01'))) return;
		if (mp.players.local.isModel(mp.game.joaat('mp_f_freemode_01'))) {
			mp.players.local.setComponentVariation(index, hasComponent[index] ? femaleNoClothes[index] : 0, 0, 0);
			hasComponent[index] = !hasComponent[index];
		}
		if (mp.players.local.isModel(mp.game.joaat('mp_m_freemode_01'))) {
			mp.players.local.setComponentVariation(index, maleNoClothes[index], 0, 0);
		}
	});
});
//ped sub menu

mp.events.add('click', (_x, _y, upOrDown, leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
	if (leftOrRight == 'left' && upOrDown == 'down') DevMenuManager.select();
});

const DevMenuInteractKey = 0x51; //Q
mp.keys.bind(DevMenuInteractKey, true, () => {
	DevMenuManager.display(true);
	mp.gui.cursor.show(true, true);
	mp.gui.cursor.position = [0.5, 0.5];
});
mp.keys.bind(DevMenuInteractKey, false, () => {
	mp.gui.cursor.show(false, false);
	DevMenuManager.display(false);
});

mp.events.add('render', () => {
	DevMenuManager.render();
});
