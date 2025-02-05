import './services';

mp.keys.bind(0x71, true, function () {
	if (mp.gui.cursor.visible) {
		mp.gui.cursor.show(false, false);
	} else {
		mp.gui.cursor.show(true, true);
	}
});
