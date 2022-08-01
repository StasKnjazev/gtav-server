import path from 'path';
import { config } from 'dotenv';

import Time from './utils/serverTime';
import MongooseConnection from './database';

import './scripts';
import './components';
import './utils';
import './events';

const dotenvConfig = config({
	path: path.resolve('.env')
});

console.log('.env =', dotenvConfig.parsed);

mp.events.add('packagesLoaded', async () => {
	new Time(new Date());
	new MongooseConnection('mongodb://localhost:27017/gta');
});
