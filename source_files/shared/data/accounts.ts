import { Account } from '../../server/db/entities/Account';

export const default_accounts: Account[] = [
	{
		username: 'test1',
		email: 'test1@test.com',
		password:
			'eccab3f63611184cd3d858f6eb5fa41170b3a8edf09e67039e21db2e3f33986032f219eb09064a1ab5df106aadfe25740836aeef8a490018532c439da26af326',
		salt: 'c830fbece4a14a8b8c80702dec2d41afe11de6556761cff7b77f9cbee6f95d66',
		role: 1
	},
	{
		username: 'test2',
		email: 'test2@test.com',
		password:
			'eccab3f63611184cd3d858f6eb5fa41170b3a8edf09e67039e21db2e3f33986032f219eb09064a1ab5df106aadfe25740836aeef8a490018532c439da26af326',
		salt: 'c830fbece4a14a8b8c80702dec2d41afe11de6556761cff7b77f9cbee6f95d66',
		role: 2
	}
];
