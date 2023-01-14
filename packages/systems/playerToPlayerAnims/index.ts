mp.events.add('playerJoin', (player) => {
	if (player.id % 2 == 0) {
		player.model = mp.joaat('mp_f_freemode_01');
		player.setHeadBlend(33, 0, 0, 0, 0, 0, 1, 0, 0);
		for (let i = 0; i < 12; i++) {
			player.setClothes(i, femaleNoClothes[i], 0, 0);
		}
	} else {
		for (let i = 0; i < 12; i++) {
			player.setClothes(i, maleNoClothes[i], 0, 0);
		}
	}
});

mp.events.add('playerJoin', (player: PlayerMp) => {
	player.__dualAnimData = undefined;
});

mp.events.add('playPlayerToPlayerAnim', (player: PlayerMp, data: string) => {
	if (player.__dualAnimData != undefined) return;
	const sceneData = JSON.parse(data);
	sceneData.players.forEach((participant: any) => {
		mp.players.at(participant.id).__dualAnimData = sceneData;
		mp.players.at(participant.id).setVariable('playerToPlayerAnimData', JSON.stringify(sceneData));
	});
});

mp.events.add('cancelPlayerToPlayerAnim', (player: PlayerMp) => {
	var __dualAnimData = player.__dualAnimData;
	__dualAnimData.players.forEach((participant: any) => {
		mp.players.at(participant.id).__dualAnimData = undefined;
		mp.players.at(participant.id).setVariable('playerToPlayerAnimData', undefined);
	});
});

const femaleNoClothes: { [key: number]: number } = {
	0: 0,
	1: 0,
	2: 48,
	3: 247,
	4: 169,
	5: 0,
	6: 35,
	7: 0,
	8: 14,
	9: 0,
	10: 0,
	11: 82
};

const maleNoClothes: { [key: number]: number } = {
	0: 0,
	1: 0,
	2: 48,
	3: 15,
	4: 148,
	5: 0,
	6: 34,
	7: 0,
	8: 191,
	9: 0,
	10: 0,
	11: 15
};
