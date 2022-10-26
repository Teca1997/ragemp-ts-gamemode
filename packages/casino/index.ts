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
	console.log('Stood up' + seatString);
	const seat = JSON.parse(seatString);
	takenSeats.splice(takenSeats.indexOf(seat), 1);
	console.log(takenSeats);
});
