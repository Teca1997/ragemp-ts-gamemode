Object.defineProperty(mp.players.local, 'ownData', {
	get() {
		const player: PlayerMp = this;
		return new Proxy(this, {
			get(target, prop, receiver) {
				return JSON.parse(player.getVariable(prop as string) as string);
			}
		});
	},

	configurable: true,
	enumerable: true
});
