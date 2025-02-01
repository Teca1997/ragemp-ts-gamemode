import { DataSource } from 'typeorm';
import { databaseConfig } from './config';

export class Database {
	private static _datasource: DataSource = new DataSource(databaseConfig);

	public static get datasource() {
		return this._datasource;
	}

	public static async init() {
		if (!this._datasource.isInitialized) {
			try {
				await this._datasource.initialize();
				console.log('Database initialized!');
			} catch (error) {
				console.log(error);
			}
		}
		return this._datasource;
	}

	/* public static get datasource(): DataSource {
		if (!DB._datasource.isInitialized) {
			DB._datasource.initialize().then((value) => {
				console.log(DB._datasource.isInitialized);
				return DB._datasource;
			});
		}
		return DB._datasource;
	} */

	private constructor() {}
}
