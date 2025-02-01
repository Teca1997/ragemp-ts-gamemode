mp.keys.bind(0x71, true, function () {
	if (mp.gui.cursor.visible) {
		mp.gui.cursor.show(false, false);
	} else {
		mp.gui.cursor.show(true, true);
	}
});

mp.browsers.new('http://package2/ui/index.html');

mp.events.add('browserCreated', (browser: BrowserMp) => {
	mp.gui.chat.push('created');
});
