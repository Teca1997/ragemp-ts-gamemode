import { yellow } from 'colorette';
import { Database } from './db';

import('./commandProcessor');
import('./service');

(async () => {
	await Database.init();

	console.log(`${yellow('[INFO]')} Packages started....`);
})();
