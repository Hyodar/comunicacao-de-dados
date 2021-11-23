
import os from 'os';

export default class Ip {
    static getIps(): Array<string> {
        const interfaces = os.networkInterfaces();
        const results: Array<string> = [];

        Object.entries(interfaces).forEach(networkEntry => {
            const [interfaceName, networks] = networkEntry;

            const addresses = networks?.filter(el => el.family === "IPv4");

            results.push(...(addresses?.map(el => el.address) || []));
        });

        return results;
    }
}
