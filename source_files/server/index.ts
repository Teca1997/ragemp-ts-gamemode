import { yellow } from 'colorette';
import { Database } from './db';

import 'reflect-metadata';
import './commandProcessor';
import './objectExtensions';
import './services';

(async () => {
	await Database.initialize();
	console.log(`${yellow('[INFO]')} Packages started....`);
})();
