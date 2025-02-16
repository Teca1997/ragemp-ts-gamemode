import { ModuleRegistry } from '@utils';

export interface ModuleMetadata {
	imports?: any[];
	exports?: any[];
	events?: any[];
	providers?: any[];
}

export function Module(metadata: ModuleMetadata) {
	return function (target: any) {
		ModuleRegistry.register(target, metadata);
	};
}
