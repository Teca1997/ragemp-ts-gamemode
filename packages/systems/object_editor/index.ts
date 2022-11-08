import * as util from 'util';

mp.events.addCommand('newobject', (_player: PlayerMp, _fullText: string) => {
	_player.call('objecteditor:newobjest', [_fullText]);
});
util.inspect.defaultOptions.depth = null;

mp.events.add('objecteditor:finish', (_player: PlayerMp, id: number, model: string, position: Vector, rotation: Vector) => {
	console.log('id: ' + id);
	console.log('model: ' + model);
	console.log('position: ' + position);
	console.log('rotation: ' + rotation);
	console.log('object: ' + { model: model, position: position, rotation: rotation });
});
