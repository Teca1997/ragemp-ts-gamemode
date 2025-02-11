import { ProcessedNamespace } from '../types';
import { processNamespace } from '../utils/processNamespace';

export namespace VariablesNamespace {
	export enum Player {
		Account,
		Characters,
		ActiveCharacter
	}
}

export const Variables: ProcessedNamespace<typeof VariablesNamespace> = processNamespace(
	'Variables',
	VariablesNamespace
);
