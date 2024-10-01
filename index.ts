import https from 'https';
import { CronJob, CronTime } from 'cron';
import { CronExpression } from './cron.expression';
import axios from 'axios';

const Axios = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
});

type CronJobType = {
	cronTime: CronExpression;
	url: string;
};

const cronJobs: CronJobType[] = [
	{
		cronTime: CronExpression.EVERY_8_HOURS,
		url: 'PUT LINK HERE',
	},
];

const sendRequest = async (url: string) => {
	try {
		console.info(`\x1b[33m 🚀 Sending GET request to: ${url} \x1b[0m`);
		const { status } = await Axios.get(url);
		console.info(`\x1b[32m ✅ Received status: ${status} from ${url} \x1b[0m`);
	} catch (e) {
		console.error(`\x1b[31m 💥 ${e instanceof Error ? e.message : JSON.stringify(e)} \x1b[0m`);
	}
};

cronJobs.forEach(({ cronTime, url }) => new CronJob(cronTime, () => sendRequest(url), null, true, 'UTC+0', {}, true));
