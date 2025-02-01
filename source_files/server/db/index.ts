import { DataSource } from 'typeorm';
import { databaseConfig } from './config';
import { yellow } from 'colorette';

export class Database {
	private static _datasource: DataSource = new DataSource(databaseConfig);

	public static get datasource() {
		return this._datasource;
	}

	public static async init() {
		if (!this._datasource.isInitialized) {
			try {
				await this._datasource.initialize();
				console.log(`${yellow('[INFO]')} Database initialized....`);
			} catch (error) {
				console.log(error);
			}
		}
	}
	private constructor() {}
}
