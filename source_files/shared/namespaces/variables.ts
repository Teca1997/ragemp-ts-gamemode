import { ProcessedNamespace } from '../types';
import { processNamespace } from '../utils/NamespaceEnumValueProcessor';

export namespace VariablesNamespace {
	export enum Player {
		Account
	}
}

export const Variables: ProcessedNamespace<typeof VariablesNamespace> = processNamespace(
	'Variables',
	VariablesNamespace
);
