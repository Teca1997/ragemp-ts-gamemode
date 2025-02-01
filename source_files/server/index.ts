import { Database } from './db';
import { yellow } from 'colorette';

(async () => {
	await Database.init();

	await import('./commandProcessor');
	await import('./service');

	console.log(`${yellow('[INFO]')} Packages started....`);
})();
