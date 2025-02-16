import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ModuleRef, ModulesContainer } from '@nestjs/core';

interface EventInstance {
	constructor: {
		name: string;
		_mpEvents?: Array<{ eventName: string; propertyKey: string; proc?: boolean }>;
	};
	[propertyKey: string]: any;
}

@Injectable()
export class EventManager implements OnApplicationBootstrap {
	constructor(private readonly moduleRef: ModuleRef, private readonly modulesContainer: ModulesContainer) {}

	async onApplicationBootstrap() {
		const modules = [...this.moduleRef['container']?.getModules().values()];

		for (const module of modules) {
			for (const provider of module.providers.values()) {
				const instance: EventInstance = provider.instance as EventInstance;

				if (!instance) continue;

				const eventMetadata = instance.constructor._mpEvents;
				if (eventMetadata) {
					for (const { eventName, propertyKey, proc } of eventMetadata) {
						const method = instance[propertyKey as keyof typeof instance];

						mp.events[proc == true ? 'addProc' : 'add'](eventName, method.bind(instance));
						console.log(
							`${'[EVENT MANAGER]'} Registered ${
								proc == true ? 'proc' : ''
							}event ${eventName} on method ${method.name} from class ${instance.constructor.name}`
						);
					}
				}
			}
		}
	}
}
