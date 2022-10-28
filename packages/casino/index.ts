const takenSeats: { position: Vector3; rotation: Vector3 }[] = [];

mp.events.add('casino:trySit', (player: PlayerMp, seatString: string) => {
	const seat = JSON.parse(seatString);
	const result = takenSeats.find((s) => s.position.x == seat.position.x && s.position.y == seat.position.y && s.position.z == seat.position.z);
	console.log('result ' + result);
	if (result == undefined) {
		takenSeats.push({ position: new mp.Vector3(seat.position.x, seat.position.y, seat.position.z), rotation: seat.rotation });
		player.call('casino:sit');
	}
});

mp.events.add('casino:cancelSit', (_: PlayerMp, seatString: string) => {
	const seat = JSON.parse(seatString);
	takenSeats.splice(takenSeats.indexOf(seat), 1);
	console.log(takenSeats);
});

import * as util from 'util';

import { blackjackPeds, roulettePeds } from './casinoPeds';

let string = '';
util.inspect.defaultOptions.depth = null;
mp.events.add('consoleLogCasinoPed', (_player: PlayerMp, data: string) => {
	const object = JSON.parse(data);
	string += `\n{\n\tposition: new mp.Vector3(${object.position.x}, ${object.position.y}, ${object.position.z}), \n\theading: ${object.headingOffset}, \n\thash: 0x1422d45b\n},`;
	console.log(string);
});

mp.events.add('consoleLog', (_player: PlayerMp, data: string) => {
	const object = JSON.parse(data);
	console.log(object);
});

mp.events.add('packagesLoaded', () => {
	blackjackPeds.forEach((ped) => {
		mp.peds.new(ped.hash, ped.position, { dimension: 0, heading: ped.heading });
	});

	roulettePeds.forEach((ped) => {
		mp.peds.new(ped.hash, ped.position, { dimension: 0, heading: ped.heading });
	});
});
