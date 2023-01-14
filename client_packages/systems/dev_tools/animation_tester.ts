import { ItemsCollection, Point, UIMenuItem, UIMenuListItem, Menu as nMenu } from 'nativeui';

import { Menu } from 'interaction_menu_API/menu';
import { MenuManager } from 'interaction_menu_API/manager';

const test = new Menu(8, 5, 6.5, 0.1, [145, 205, 245, 155], [145, 205, 245, 255], ...Array(2)); // Declare a new menu with the last 2 parameters set to default
const testManager = new MenuManager(test);

let animDict = 'amb@medic@standing@tendtodead@enter';
let animName = 'enter';
let blendIn = 0;
let blendOut = 0;
let duration = -1;
let flags = 0;
let playback = 0.7;
let intervalRate = 1000;

test.add('test', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), async () => {
	if (animationTweakerMenu.Visible) animationTweakerMenu.Close();
	else animationTweakerMenu.Open();

	mp.game.streaming.requestAnimDict(animDict);
	mp.game.streaming.requestAnimDict('mp_arresting');
	mp.players.local.freezePosition(true);

	mp.players.local.taskPlayAnim('mp_arresting', 'idle', 1, 2, -1, 1 + 16 + 32 + 524288, 0, false, false, false);

	loopAnim();
});

test.add('stop anim', 'mpmissmarkers256', 'darts_icon', false, false, ...(Array(2) as [RGBA, RGBA]), async () => {
	loop = false;
});

mp.events.add('render', () => {
	testManager.render();
});

mp.events.add('click', (_x, _y, upOrDown, leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
	if (leftOrRight == 'left' && upOrDown == 'down') testManager.select();
});

mp.keys.bind(0x59, true, () => {
	testManager.display(true);
	mp.gui.cursor.show(true, true);
	mp.gui.cursor.position = [0.5, 0.5];
});
mp.keys.bind(0x59, false, () => {
	mp.gui.cursor.show(false, false);
	testManager.display(false);
});

let blendInStep = 0.05;
let blendInOutSpeedValues: string[] = [];
for (let i = -10; i < 10; i += blendInStep) {
	blendInOutSpeedValues.push(i.toFixed(2).toString());
}
blendIn = parseFloat(blendInOutSpeedValues[1000]);
blendOut = parseFloat(blendInOutSpeedValues[1000]);

let intervalStep = 0.01;
let intrvalValues: string[] = [];
for (let i = 0; i < 3; i += intervalStep) {
	intrvalValues.push(i.toFixed(2).toString());
}

let playbackStep = 0.0001;
let playbackValues: string[] = [];
for (let i = 0; i < 1; i += playbackStep) {
	playbackValues.push(i.toFixed(4).toString());
}

const animationTweakerMenu = new nMenu('Clothes', '', new Point(150, 50));
animationTweakerMenu.AddItem(
	new UIMenuListItem('Blend In Speed', 'daw', new ItemsCollection(blendInOutSpeedValues), blendInOutSpeedValues.length / 2)
);
animationTweakerMenu.AddItem(
	new UIMenuListItem('Blend Out Speed', 'daw', new ItemsCollection(blendInOutSpeedValues), blendInOutSpeedValues.length / 2)
);
animationTweakerMenu.AddItem(new UIMenuListItem('Interval', 'daw', new ItemsCollection(intrvalValues), 101));
animationTweakerMenu.AddItem(new UIMenuListItem('Playback', 'daw', new ItemsCollection(playbackValues), 0));
animationTweakerMenu.ListChange.on((item: UIMenuItem, index: number) => {
	mp.console.logInfo('item text ' + item.Text);
	mp.console.logInfo(index.toString());

	switch (item.Text) {
		case 'Blend In Speed':
			blendIn = parseFloat(blendInOutSpeedValues[index]);

			break;

		case 'Blend Out Speed':
			blendOut = parseFloat(blendInOutSpeedValues[index]);
			break;

		case 'Interval':
			intervalRate = parseFloat(intrvalValues[index]) * 1000;
			break;
		case 'Playback':
			playback = parseFloat(playbackValues[index]);
			break;
	}
});

animationTweakerMenu.Close();

let loop = true;
async function loopAnim() {
	loop = true;
	while (loop) {
		mp.gui.chat.push('wd' + intervalRate);
		mp.players.local.taskPlayAnim(animDict, animName, blendIn, blendOut, duration, flags, playback, false, false, false);
		await mp.game.waitAsync(intervalRate);
	}
}
