import { AnimDicts } from 'systems/casino/config';

mp.events.add('playerReady', async () => {
	mp.game.streaming.requestModel(mp.game.joaat('S_M_Y_Casino_01'));
	//mp.game.waitAsync(5000);

	AnimDicts.forEach((animDist: string) => {
		mp.game.streaming.requestAnimDict(animDist);
	});
	mp.gui.chat.push(`Loaded ${AnimDicts.length} anim dicts`);
	/*
	blackjackPeds.forEach((ped, n) => {
		let newPed = spawnCasinoPed(ped, n);
		newPed.taskPlayAnim('anim_casino_b@amb@casino@games@blackjack@dealer', 'check_and_turn_card', 1000.0, -2.0, -1, 1, 1148846080, false, false, false);
	});
	mp.gui.chat.push(`Spawned ${blackjackPeds.length} blackjack dealers`);
	roulettePeds.forEach((ped, n) => {
		let newPed = spawnCasinoPed(ped, n);
		newPed.taskPlayAnim('anim_casino_b@amb@casino@games@roulette@dealer', 'spin_wheel', 1000.0, -2.0, -1, 1, 1148846080, false, false, false);
	});
	mp.gui.chat.push(`Spawned ${roulettePeds.length} roulette dealers`);
	*/
});

export function spawnCasinoPed(ped: any, n: number) {
	const newPed = mp.peds.new(mp.game.joaat('S_M_Y_Casino_01'), ped.position, ped.heading, 0);
	newPed.setComponentVariation(0, 2, 1, 0);
	newPed.setComponentVariation(1, 1, 0, 0);
	newPed.setComponentVariation(2, 2, 0, 0);
	newPed.setComponentVariation(3, 0, n + 2, 0);
	newPed.setComponentVariation(4, 0, 0, 0);
	newPed.setComponentVariation(6, 1, 0, 0);
	newPed.setComponentVariation(7, 2, 0, 0);
	newPed.setComponentVariation(8, 1, 0, 0);
	newPed.setComponentVariation(10, 1, 0, 0);
	newPed.setComponentVariation(11, 1, 0, 0);
	newPed.setConfigFlag(185, true);
	newPed.setConfigFlag(108, true);
	newPed.setConfigFlag(208, true);
	return newPed;
}
