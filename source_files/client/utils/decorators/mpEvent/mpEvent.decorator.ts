import { MPEventRegistry } from './mpEvent.registry';

type MPEventOptions = {
	name?: string;
	proc?: boolean;
};

export function MPEvent(options: MPEventOptions | undefined | null): MethodDecorator {
	const { name, proc } = options || {};
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;
		descriptor.value = function (...args: any[]) {
			originalMethod.apply(this, args);
		};
		if (!target.constructor._events) {
			target.constructor._events = [];
		}
		MPEventRegistry.register(target.constructor, {
			eventName: name ? name : propertyKey.toString(),
			method: target[propertyKey],
			proc: proc ? proc : false
		});
	};
}
