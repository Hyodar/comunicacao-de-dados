
import net from 'net';

const Client = (host = '127.0.0.1', port = 4000, onConnect: () => void = () => {}, onDisconnect: () => void = () => {}) => {
  const client = new net.Socket();
  client.connect(port, host, onConnect);

  client.on('error', (error: Error) => {
    if (error.message.indexOf('ECONNREFUSED') !== -1) {
      // continuamente tenta reconexão caso o servidor não esteja ativo ainda
      setTimeout(() => {
        if (!client.destroyed) {
          client.connect(port, host, onConnect);
        }
      }, 10000);
    }
  });

  client.on('end', (hadError: boolean) => {
    onDisconnect();
    disconnect();
  });

  const sendMessage = (message: string|Buffer) => {
    client.write(message);
  };

  const disconnect = () => {
    client.destroy();
  };

  return { sendMessage, disconnect };
};

export default Client;
