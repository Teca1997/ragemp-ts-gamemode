import { ownDataType } from '@shared';

if (!mp.Player.prototype.__ownData) {
	mp.Player.prototype.__ownData = {};
}
if (!mp.Player.prototype.ownData) {
	mp.Player.prototype.ownData = {};
}

Object.defineProperty(mp.Player.prototype, 'ownData', {
	get() {
		const player: PlayerMp = this;
		return new Proxy(this.__ownData, {
			get(target, prop, receiver) {
				return Reflect.get(target, prop, receiver);
			},
			set(target, prop, value, receiver) {
				player.setOwnVariable(prop as string, JSON.stringify(value));
				return Reflect.set(target, prop, value, receiver);
			}
		});
	},
	set(value: ownDataType) {
		this.__ownData = value;
	},
	configurable: true,
	enumerable: true
});
