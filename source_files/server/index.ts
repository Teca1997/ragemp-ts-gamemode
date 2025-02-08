import { yellow } from 'colorette';
import { Datasource } from './db';

import './commandProcessor';
import './services';

(async () => {
	await Datasource.initialize();
	console.log(`${yellow('[INFO]')} Packages started....`);
})();
