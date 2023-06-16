import net from 'node:net';
import { exec, spawn } from 'child_process';

export default async function isPortReachable(port, {host, timeout = 1000} = {}) {
	if (typeof host !== 'string') {
		throw new TypeError('Specify a `host`');
	}

	const promise = new Promise(((resolve, reject) => {
		const socket = new net.Socket();

		const onError = () => {
			socket.destroy();
			reject();
		};

		socket.setTimeout(timeout);
		socket.once('error', onError);
		socket.once('timeout', onError);

		socket.connect(port, host, () => {
			socket.end();
			resolve();
		});
	}));

	try {
		await promise;
		return true;
	} catch {
		return false;
	}
}

async function init() {
    const isReachable = await isPortReachable(3306, {host: 'mysql'})

    if (!isReachable) {
        exec('./start.sh')
        return
    }
    exec('./start.sh', err => {
        if (err) {
            console.log(err)
        }
    })
    await sleep(5000)
    console.log('Waiting for mysql to start...')
    return
    init()
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


exec('yarn', () => {
    init()
})