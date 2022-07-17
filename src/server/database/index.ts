import { consoleColor } from '@/../shared/contansts';
import mongoose from 'mongoose';

import './scripts/userSave';

export default class MongooseConnection {
	private url: string;

	constructor(urlDatabase: string) {
		this.url = urlDatabase;

		this.connection();
	}

	private async connection() {
		try {
			await mongoose.connect(this.url, {
				keepAlive: true
			});

			console.log(`${consoleColor.Yellow}[Server] ${consoleColor.Reset}Mongoose Database - ${consoleColor.Green}true${consoleColor.Reset}.`);
		} catch (e) {
			console.error(e);
			console.log(`${consoleColor.Yellow}[Server] ${consoleColor.Reset}Mongoose Database - ${consoleColor.Red}false${consoleColor.Reset}.`);
		}
	}
}
