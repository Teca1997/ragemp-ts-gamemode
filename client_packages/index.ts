import 'anim_player';
import 'casino';
import 'dev_tools';
import 'fly';
import 'hunting';
import 'npc';
import 'object_editor';
import 'sit_anywhere';
import 'vehicle';

mp.keys.bind(0x71, true, function () {
	if (mp.gui.cursor.visible) {
		mp.gui.cursor.show(false, false);
	} else {
		mp.gui.cursor.show(true, true);
	}
});
