import { yellow } from 'colorette';

export class AdminService {
	private static _instance: AdminService = new AdminService();

	private constructor() {
		console.log(`${yellow('[INFO]')} Admin service started...`);
	}

	public static get instance(): AdminService {
		return AdminService._instance;
	}
}
