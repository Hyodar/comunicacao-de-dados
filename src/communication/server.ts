import net from 'net';

const Server = (
  callback: (message: string) => void,
  host = '127.0.0.1',
  port = 4000
) => {
  const server = net.createServer((socket: any) => {
    socket.on('data', (data: any) => {
      callback(data.toString());
    });
  });

  server.on('error', (error: any) => {
    console.log(error);
  });

  server.listen(port, host);

  const close = () => {
    console.log('Server closed');
    server.close();
  };

  return { close };
};

export default Server;
