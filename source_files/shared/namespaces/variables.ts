import { ProcessedNamespace } from '../types';
import { Utils } from '../utils';

export namespace VariablesNamespace {
	export enum Player {
		Account,
		Characters,
		ActiveCharacter
	}
}

export const Variables: ProcessedNamespace<typeof VariablesNamespace> = Utils.processNamespace(
	'Variables',
	VariablesNamespace
);
