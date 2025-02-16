export class ModuleRegistry {
	private static modules = new Map<any, any>();

	static register(moduleClass: any, metadata: any) {
		this.modules.set(moduleClass, metadata);
	}

	static get(moduleClass: any) {
		return this.modules.get(moduleClass);
	}

	static has(moduleClass: any) {
		return this.modules.has(moduleClass);
	}
}
