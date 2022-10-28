mp.events.add({
	'hunting:update_animal_death': (handle) => {
		if (handle == null || handle.length == 0) return;
		mp.game.invoke(RageEnums.Natives.PED.APPLY_DAMAGE_TO_PED, handle, 110, true);
	},

	'hunting:update_animal_position': (handle) => {
		mp.events.callRemote('hunting:update_animal_position', handle, handle.position);
		mp.events.add('updated ped position for ped type ' + handle.type);
	},
	'hunting:animal_task_smart_flee': (ped: PedMp, fleeingPed, safeDistance, fleeTime, preferPavements, updateToNearestHatedPed) => {
		mp.game.invoke(RageEnums.Natives.TASK.TASK_SMART_FLEE_PED, ped.handle, fleeingPed.handle, safeDistance, fleeTime, preferPavements, updateToNearestHatedPed);
		mp.gui.chat.push(`hunting:animal_task_smart_flee for ped ${ped.remoteId}`);
	},
	'hunting:animal_task_Wander_in_area': (ped: PedMp, x, y, z, radius, minimalLength, timeBetweenWalks) => {
		mp.game.invoke(RageEnums.Natives.TASK.TASK_WANDER_IN_AREA, ped.handle, x, y, z, radius, minimalLength, timeBetweenWalks);
		mp.gui.chat.push(`hunting:animal_task_Wander_in_area for ped ${ped.remoteId}`);
	},
	'hunting:playAnimalScenario': (ped: PedMp, scenario: string) => {
		ped.taskStartScenarioInPlace(scenario, 0, true);
		mp.gui.chat.push(`hunting:playAnimalScenario for ped ${ped.remoteId}`);
	}
});
mp.events.addProc({
	'hunting:get_Is_Dead_Or_Dying_From_Player': (ped: PedMp) => {
		return ped.isDead();
	}
});
