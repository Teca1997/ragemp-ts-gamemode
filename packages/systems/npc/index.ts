import { NPCServerTrafficHandler } from './NPCHandler';

mp.events.add('packagesLoaded', async () => {
	NPCServerTrafficHandler.initNPCVehicleTraffic();
	//NPCServerTrafficHandler.initNPCOnFootTraffic();
});

//import './npc';
