import { ProcessedNamespace } from '../types';

function processEnum<T>(namespacePath: string, enumObj: T): Record<keyof T, string> {
	const result = {} as Record<keyof T, string>;

	for (const key in enumObj) {
		if (isNaN(Number(key))) {
			result[key as keyof T] = `${namespacePath}::${key}`;
		}
	}

	return result;
}

export function processNamespace<T>(namespacePath: string, obj: T): ProcessedNamespace<T> {
	const result = {} as ProcessedNamespace<T>;

	for (const key in obj) {
		const current = obj[key];
		if (typeof current === 'object' && current !== null) {
			const hasNumericValues = Object.values(current).some(
				(value) => typeof value === 'number'
			);
			if (hasNumericValues) {
				(result as any)[key] = processEnum(`${namespacePath}::${key}`, current);
			} else {
				(result as any)[key] = processNamespace(`${namespacePath}::${key}`, current);
			}
		}
	}

	return result;
}
