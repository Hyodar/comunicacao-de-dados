import net from 'net';

const Client = (host = '127.0.0.1', port = 4000) => {
  const client = new net.Socket();
  client.connect(port, host, () => {
    console.log('Connected');
  });

  client.on('error', (error: any) => {
    console.log(error);
  });

  const sendMessage = (message: string) => {
    client.write(message);
  };

  const disconnect = () => {
    client.destroy();
    console.log('Client destroyed');
  };

  return { sendMessage, disconnect };
};

export default Client;
