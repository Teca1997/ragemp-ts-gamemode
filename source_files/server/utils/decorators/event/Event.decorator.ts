type MPEventOptions = {
	name?: string;
	proc?: boolean;
};

function MPEvent(options?: MPEventOptions): MethodDecorator {
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		if (!target.constructor._mpEvents) {
			target.constructor._mpEvents = [];
		}

		target.constructor._mpEvents.push({
			eventName: options?.name ? options.name : propertyKey,
			propertyKey: propertyKey,
			proc: options?.proc ? options.proc : false
		});
	};
}

export { MPEvent };
