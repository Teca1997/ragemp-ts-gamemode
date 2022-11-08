var res = mp.game.graphics.getScreenActiveResolution(0, 0);

let MOVE_SENSITIVTY = 50;
let ROT_SENSITIVITY = 800;

let selObj: ObjectMp | null = null;
let oldPos: Vector3;
let oldRot: Vector3;
let mode = 'Move';
let curBtn: string;
let oldcursorPos = [0, 0];

let xbox: { x: number; y: number };
let ybox: { x: number; y: number };
let zbox: { x: number; y: number };
let switchbox: { x: number; y: number };
let groundbox: { x: number; y: number };
let cancelbox: { x: number; y: number } | undefined;
let savebox: { x: number; y: number } | undefined;

mp.events.add('objecteditor:start', (objid) => {
	mp.players.local.setAlpha(0);
	mp.gui.cursor.show(true, true);
	selObj = mp.objects.at(objid);
	selObj.setCollision(false, false);
	oldPos = selObj.position;
	oldRot = selObj.rotation;
});

mp.events.add('render', () => {
	if (selObj) {
		mp.game.graphics.drawLine(
			selObj.position.x - 1.0,
			selObj.position.y,
			selObj.position.z,
			selObj.position.x + 1.0,
			selObj.position.y,
			selObj.position.z,
			0,
			0,
			255,
			255
		);
		mp.game.graphics.drawLine(
			selObj.position.x,
			selObj.position.y - 1.0,
			selObj.position.z,
			selObj.position.x,
			selObj.position.y + 1.0,
			selObj.position.z,
			255,
			0,
			0,
			255
		);
		mp.game.graphics.drawLine(
			selObj.position.x,
			selObj.position.y,
			selObj.position.z - 1.0,
			selObj.position.x,
			selObj.position.y,
			selObj.position.z + 1.0,
			0,
			255,
			0,
			255
		);

		xbox = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x + 1.5, selObj.position.y, selObj.position.z));
		ybox = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y + 1.5, selObj.position.z));
		zbox = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z + 1.5));
		switchbox = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x - 0.8, selObj.position.y - 0.8, selObj.position.z));
		if (switchbox != undefined) {
			groundbox = { x: switchbox.x + 0.065, y: switchbox.y };
			cancelbox = { x: switchbox.x + 0.13, y: switchbox.y };
			savebox = { x: switchbox.x + 0.195, y: switchbox.y };
		} else {
			(cancelbox = undefined), (savebox = undefined);
		}

		if (xbox != undefined) {
			mp.game.graphics.drawRect(xbox.x, xbox.y, 0.015, 0.026, 0, 0, 255, 255, true);
			mp.game.graphics.drawText('X', [xbox.x, xbox.y - 0.015], {
				font: 2,
				color: [255, 255, 255, 255],
				scale: [0.5, 0.5],
				outline: false
			});
		}
		if (ybox != undefined) {
			mp.game.graphics.drawRect(ybox.x, ybox.y, 0.015, 0.026, 255, 0, 0, 255, true);
			mp.game.graphics.drawText('Y', [ybox.x, ybox.y - 0.016], {
				font: 2,
				color: [255, 255, 255, 255],
				scale: [0.5, 0.5],
				outline: false
			});
		}
		if (zbox != undefined) {
			mp.game.graphics.drawRect(zbox.x, zbox.y, 0.015, 0.026, 0, 255, 0, 255, true);
			mp.game.graphics.drawText('Z', [zbox.x, zbox.y - 0.016], {
				font: 2,
				color: [255, 255, 255, 255],
				scale: [0.5, 0.5],
				outline: false
			});
		}
		if (switchbox != undefined) {
			mp.game.graphics.drawRect(switchbox.x, switchbox.y, 0.06, 0.026, 255, 255, 255, 255, true);
			mp.game.graphics.drawRect(groundbox.x, groundbox.y, 0.06, 0.026, 255, 255, 255, 255, true);
			mp.game.graphics.drawRect(cancelbox!.x, cancelbox!.y, 0.06, 0.026, 255, 255, 255, 255, true);
			mp.game.graphics.drawRect(savebox!.x, savebox!.y, 0.06, 0.026, 255, 255, 255, 255, true);
			mp.game.graphics.drawText(mode == 'Move' ? 'Rotate' : 'Move', [switchbox.x, switchbox.y - 0.016], {
				font: 0,
				color: [0, 0, 0, 255],
				scale: [0.4, 0.4],
				outline: false
			});
			mp.game.graphics.drawText('Ground', [groundbox.x, groundbox.y - 0.016], {
				font: 0,
				color: [0, 0, 0, 255],
				scale: [0.4, 0.4],
				outline: false
			});
			mp.game.graphics.drawText('Cancel', [cancelbox!.x, cancelbox!.y - 0.016], {
				font: 0,
				color: [0, 0, 0, 255],
				scale: [0.4, 0.4],
				outline: false
			});
			mp.game.graphics.drawText('Save', [savebox!.x, savebox!.y - 0.016], {
				font: 0,
				color: [0, 0, 0, 255],
				scale: [0.4, 0.4],
				outline: false
			});
		}

		let pos = mp.gui.cursor.position;
		let cursorDir = { x: pos[0] - oldcursorPos[0], y: pos[1] - oldcursorPos[1] };
		cursorDir.x /= res.x;
		cursorDir.y /= res.y;

		if (curBtn == 'x') {
			let mainPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z));
			let refPos;
			if (mode == 'Move') {
				refPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x + 1, selObj.position.y, selObj.position.z));
			} else {
				refPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y + 1, selObj.position.z));
			}
			if (mainPos == undefined || refPos == undefined) return;
			var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
			var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
			if (mode == 'Move') {
				selObj.position = new mp.Vector3(selObj.position.x + magnitude * MOVE_SENSITIVTY, selObj.position.y, selObj.position.z);
			} else {
				selObj.rotation = new mp.Vector3(selObj.rotation.x - magnitude * ROT_SENSITIVITY, selObj.rotation.y, selObj.rotation.z);
			}
		} else if (curBtn == 'y') {
			let mainPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z));
			let refPos;
			if (mode == 'Move') {
				refPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y + 1, selObj.position.z));
			} else {
				refPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x + 1, selObj.position.y, selObj.position.z));
			}
			if (mainPos == undefined || refPos == undefined) return;
			var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
			var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
			if (mode == 'Move') {
				selObj.position = new mp.Vector3(selObj.position.x, selObj.position.y + magnitude * MOVE_SENSITIVTY, selObj.position.z);
			} else {
				selObj.rotation = new mp.Vector3(selObj.rotation.x, selObj.rotation.y + magnitude * ROT_SENSITIVITY, selObj.rotation.z);
			}
		} else if (curBtn == 'z') {
			let mainPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z));
			let refPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z + 1));
			if (mainPos == undefined || refPos == undefined) return;
			var screenDir = { x: refPos.x - mainPos.x, y: refPos.y - mainPos.y };
			var magnitude = cursorDir.x * screenDir.x + cursorDir.y * screenDir.y;
			if (mode == 'Move') {
				selObj.position = new mp.Vector3(selObj.position.x, selObj.position.y, selObj.position.z + magnitude * MOVE_SENSITIVTY);
			} else {
				selObj.rotation = new mp.Vector3(selObj.rotation.x, selObj.rotation.y, selObj.rotation.z + cursorDir.x * ROT_SENSITIVITY * 0.2); //Here direction can be determined by just x axis of mouse, hence the *0.2
			}
		}
		oldcursorPos = pos;
	}
});
let n = 0;
mp.events.add('click', (x, y, upOrDown, _leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
	if (selObj && _leftOrRight == 'right' && upOrDown == 'up') return;

	if (!selObj && _leftOrRight == 'right' && _hitEntity == 0 && upOrDown == 'up' && !mp.keys.isDown(17)) {
		const target: any = mp.raycasting.testCapsule(mp.players.local.getBoneCoords(12844, 0.5, 0, 0), _worldPosition, 0.25, mp.players.local, 18);
		if (target == undefined) return;

		if (target.entity.id == undefined) {
			mp.gui.chat.push('Cannot edit world objects');
		} else if (target.entity.id != undefined) {
			mp.gui.chat.push('opening object editor');
			mp.events.call('objecteditor:start', target.entity.id);
		}
	}

	if (!selObj) return;

	let mouseRel = { x: x / res.x, y: y / res.y };

	if (upOrDown == 'up') {
		curBtn = '';
	} else if (upOrDown == 'down') {
		if (
			xbox != undefined &&
			mouseRel.x >= xbox.x - 0.01 &&
			mouseRel.x <= xbox.x + 0.009 &&
			mouseRel.y >= xbox.y - 0.015 &&
			mouseRel.y <= xbox.y + 0.009
		) {
			curBtn = 'x';
		} else if (
			ybox != undefined &&
			mouseRel.x >= ybox.x - 0.01 &&
			mouseRel.x <= ybox.x + 0.009 &&
			mouseRel.y >= ybox.y - 0.015 &&
			mouseRel.y <= ybox.y + 0.009
		) {
			curBtn = 'y';
		} else if (
			zbox != undefined &&
			mouseRel.x >= zbox.x - 0.01 &&
			mouseRel.x <= zbox.x + 0.009 &&
			mouseRel.y >= zbox.y - 0.015 &&
			mouseRel.y <= zbox.y + 0.009
		) {
			curBtn = 'z';
		} else if (
			switchbox != undefined &&
			mouseRel.x >= switchbox.x - 0.03 &&
			mouseRel.x <= switchbox.x + 0.03 &&
			mouseRel.y >= switchbox.y - 0.015 &&
			mouseRel.y <= switchbox.y + 0.009
		) {
			switchMode();
		} else if (
			groundbox != undefined &&
			mouseRel.x >= groundbox.x - 0.03 &&
			mouseRel.x <= groundbox.x + 0.03 &&
			mouseRel.y >= groundbox.y - 0.015 &&
			mouseRel.y <= groundbox.y + 0.009
		) {
			groundObject();
		} else if (
			cancelbox != undefined &&
			mouseRel.x >= cancelbox.x - 0.03 &&
			mouseRel.x <= cancelbox.x + 0.03 &&
			mouseRel.y >= cancelbox.y - 0.015 &&
			mouseRel.y <= cancelbox.y + 0.009
		) {
			cancel();
		} else if (
			savebox != undefined &&
			mouseRel.x >= savebox.x - 0.03 &&
			mouseRel.x <= savebox.x + 0.03 &&
			mouseRel.y >= savebox.y - 0.015 &&
			mouseRel.y <= savebox.y + 0.009
		) {
			saveChanges();
		}
	}
});

mp.events.add('objecteditor:newobjest', (objectModelName: string) => {
	mp.gui.chat.push('creating new object');
	const position = mp.players.local.position;
	let obj = mp.objects.new(mp.game.joaat(objectModelName), new mp.Vector3(position.x, position.y, position.z));
	mp.events.call('objecteditor:start', obj.id);
});

function switchMode() {
	mode = mode == 'Move' ? 'Rotation' : 'Move';
}

function groundObject() {
	selObj!.placeOnGroundProperly();
	let pos = selObj!.getCoords(true);
	let rot = selObj!.getRotation(2);
	selObj!.position = new mp.Vector3(pos.x, pos.y, pos.z);
	selObj!.rotation = new mp.Vector3(rot.x, rot.y, rot.z); //FIX BUG WHERE POSITION PROPERTY != GAME POSITION
}

function cancel() {
	mp.players.local.setAlpha(255);
	selObj!.position = oldPos;
	selObj!.rotation = oldRot;
	selObj!.setCollision(true, true);
	selObj = null;
	mp.gui.cursor.show(false, false);
}

function saveChanges() {
	let pos = selObj!.getCoords(true);
	mp.players.local.setAlpha(255);
	let rot = selObj!.getRotation(2);
	mp.events.callRemote('objecteditor:finish', selObj!.remoteId, selObj!.model, JSON.stringify(pos), JSON.stringify(rot));
	selObj!.setCollision(true, true);
	selObj = null;
	mp.gui.cursor.show(false, false);
}
