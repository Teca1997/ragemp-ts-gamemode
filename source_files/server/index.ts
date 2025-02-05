import { Database } from './db';
import { yellow } from 'colorette';

import('./commandProcessor');
import('./service');

(async () => {
	await Database.init();

	console.log(`${yellow('[INFO]')} Packages started....`);
})();
