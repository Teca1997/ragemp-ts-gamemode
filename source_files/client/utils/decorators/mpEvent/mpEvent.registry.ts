type MPEventData = { eventName: string; method: Function; proc: boolean };
export class MPEventRegistry {
	private static registry = new Map<Function, MPEventData[]>();

	static register(target: Function, eventData: MPEventData) {
		if (!this.registry.has(target)) {
			this.registry.set(target, []);
		}

		const classEvents = this.registry.get(target)!;

		if (classEvents.findIndex((event) => event.eventName === eventData.eventName) !== -1) {
			mp.console.logError(`Event "${eventData.eventName}" is already registered in ${target.name}.`);
		}

		classEvents.push(eventData);
	}

	static get(target: Function) {
		return this.registry.get(target) || [];
	}

	static has(target: Function) {
		return this.registry.has(target);
	}
}
