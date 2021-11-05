import net from 'net';

const Server = (
  callback: (message: string) => void,
  host = '127.0.0.1',
  port = 4000,
  onConnect: () => void = () => {}
) => {
  const sockets: Array<net.Socket> = [];

  const server = net.createServer((socket: any) => {
    socket.on('data', (data: any) => {
      callback(data.toString());
    });
  });

  server.on('error', (error: any) => {
    console.log(error);
  });

  server.listen(port, host);

  server.on('connection', (socket: net.Socket) => {
    sockets.push(socket);
    onConnect();
  });

  const close = () => {
    server.close();
    
    sockets.forEach(socket => {
      if (!socket.destroyed) {
        socket.destroy();
      }
    });
  };

  return { close };
};

export default Server;
