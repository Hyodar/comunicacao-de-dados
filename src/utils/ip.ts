
import os from 'os';

export default class Ip {
    static getIps(): Array<string> {
        const networks = os.networkInterfaces();
        const results: Array<string> = [];

        Object.values(networks).forEach(networkIps => {
            const addresses = networkIps?.map(el => el.address);
            results.push(...(addresses || []));
        });

        return results;
    }
}
