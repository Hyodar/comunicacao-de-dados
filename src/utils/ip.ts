
import os from 'os';

export default class Ip {
    static getIps(): Array<string> {
        const interfaces = os.networkInterfaces();
        const results: Array<string> = [];

        Object.entries(interfaces).forEach(networkEntry => {
            const [interfaceName, networks] = networkEntry;

            const addresses = networks?.map(el => {
                if (el.address.startsWith("fe80")) {
                    return `${el.address}%${interfaceName}`;
                }
                else {
                    return el.address;
                }
            });

            results.push(...(addresses || []));
        });

        return results;
    }
}
