import './scenarionBrowser';

mp.events.add('playerJoin', () => {
	console.log('player joined');
	mp.peds.new(mp.joaat('mp_m_freemode_01'), new mp.Vector3(-631, -243, 43), {
		dynamic: true,
		dimension: 0,
		heading: 0
	});
	mp.peds.new(mp.joaat('mp_m_freemode_01'), new mp.Vector3(-631, -243, 43), {
		dynamic: true,
		dimension: 0,
		heading: 0
	});
	mp.peds.new(mp.joaat('mp_m_freemode_01'), new mp.Vector3(-631, -243, 43), {
		dynamic: true,
		dimension: 0,
		heading: 0
	});
	mp.peds.new(mp.joaat('mp_m_freemode_01'), new mp.Vector3(-631, -243, 43), {
		dynamic: true,
		dimension: 0,
		heading: 0
	});
});

mp.events.add('consoleLog', (_: PlayerMp, data: string) => {
	console.log(data);
});

const takenSeats: { vector: Vector3; headingOffset: number }[] = [
	{ vector: new mp.Vector3(-630.8784790039062, -251.6275634765625, 37.982234954833984), headingOffset: 180 },
	{ vector: new mp.Vector3(-629.2598266601562, -250.63253784179688, 37.982234954833984), headingOffset: 180 },
	{ vector: new mp.Vector3(-631.0064697265625, -247.91200256347656, 37.901493072509766), headingOffset: 180 },
	{ vector: new mp.Vector3(-632.58349609375, -248.97178649902344, 37.901493072509766), headingOffset: 180 }
];
mp.events.add('sit:trySit', (player: PlayerMp, seatString: string) => {
	const seat = JSON.parse(seatString);
	const result = takenSeats.find((s) => s.vector.x == seat.vector.x && s.vector.y == seat.vector.y && s.vector.z == seat.vector.z);
	console.log('result ' + result);
	if (result == undefined) {
		takenSeats.push({ vector: new mp.Vector3(seat.vector.x, seat.vector.y, seat.vector.z), headingOffset: seat.headingOffset });
		player.call('sit:sit');
	}
});

mp.events.add('sit:cancelSit', (_: PlayerMp, seatString: string) => {
	console.log('Stood up');
	const seat = JSON.parse(seatString);
	takenSeats.splice(takenSeats.indexOf(seat), 1);
	console.log(takenSeats);
});

mp.events.addCommand('flag', (player) => {
	mp.objects.new('apa_prop_flag_portugal', player.position, {
		rotation: player.position,
		alpha: 1000,
		dimension: player.dimension
	});
});
