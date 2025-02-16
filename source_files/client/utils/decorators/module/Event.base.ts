export abstract class EventsBase {
	public _events: { eventName: string; handler: Function; proc: boolean }[] = [];
	constructor() {
		mp.console.logInfo(`${this.constructor.name} created!`);
	}
}
