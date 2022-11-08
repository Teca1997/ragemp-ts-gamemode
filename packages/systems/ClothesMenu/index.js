mp.events.add('setClothes', (player, componentId, drawable, texture) => {
	console.log('setclothes ' + { player, componentId, drawable, texture });
	player.setClothes(parseInt(componentId), parseInt(drawable), parseInt(texture), 2);
});

mp.events.add('setProp', (player, componentId, drawable, texture) => {
	console.log('setProp ' + { player, componentId, drawable, texture });
	player.setProp(parseInt(componentId), parseInt(drawable), parseInt(texture));
});
