import { container } from 'tsyringe';
import { MPEventRegistry } from 'utils/decorators';
import { ModuleMetadata } from 'utils/decorators/module';
import { ModuleRegistry } from './module.registry';

export class ModuleResolver {
	static resolve(moduleClass: Function) {
		if (!ModuleRegistry.has(moduleClass)) {
			mp.console.logError(`Module ${moduleClass} is not registered.`);
			return;
		}
		const metadata: ModuleMetadata = ModuleRegistry.get(moduleClass);
		mp.console.logInfo(`----------------------------------------------`);
		mp.console.logInfo(`[MODULES] Resolving module ${moduleClass.name}`);
		mp.console.logInfo(`----------------------------------------------`);
		const moduleInstance = container.resolve(moduleClass as any);

		this.resolveImports(metadata.imports);
		this.resolveProviders(metadata.providers);
		this.resolveEvents(metadata.events);

		this.callLifecycleHooks(moduleInstance);

		mp.console.logInfo(`----------------------------------------------`);
		mp.console.logInfo(`[MODULES] ${moduleClass.name} resolved `);
		mp.console.logInfo(`----------------------------------------------`);
		return moduleInstance;
	}

	private static resolveEvents(eventClasses: Function[] = []) {
		eventClasses.forEach((eventClass) => {
			const instance: any = container.resolve(eventClass as any);
			const events = MPEventRegistry.get(eventClass);
			events?.forEach(
				({
					eventName,
					method,
					proc
				}: {
					eventName: string;
					method: Function;
					proc: boolean;
				}) => {
					if (proc == true) {
						mp.events.addProc(eventName, async (...args: any[]) => {
							const result = await method.apply(instance, [
								...args
							]);
							return result !== undefined ? result : null;
						});
					} else {
						mp.events.add(eventName, method.bind(instance));
					}
					mp.console.logInfo(
						`Registered ${
							proc == true ? 'proc ' : ''
						}event ${eventName} on method ${method.name} from ${
							instance.constructor.name
						}`
					);
				}
			);
		});
	}

	private static resolveImports(imports: any[] = []) {
		imports.forEach((importedModule) => {
			if (!ModuleRegistry.has(importedModule)) {
				mp.console.logError(
					`Imported module ${importedModule} is not registered.`
				);
			}
			this.resolve(importedModule);
		});
	}

	private static resolveProviders(providers: any[] = []) {
		providers.forEach((provider) => {
			container.resolve(provider);
		});
	}

	private static callLifecycleHooks(instance: any) {
		if (typeof instance.onInit === 'function') {
			instance.onInit();
		}
	}
}
