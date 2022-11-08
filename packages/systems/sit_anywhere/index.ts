import './scenarionBrowser';

mp.events.add('playerJoin', () => {
	console.log('player joined');
});

const takenSeats: { vector: Vector3; headingOffset: number }[] = [];
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
