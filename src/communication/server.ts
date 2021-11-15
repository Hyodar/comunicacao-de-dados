
import net from 'net';

const Server = (
  callback: (buffer: Buffer) => void,
  host = '127.0.0.1',
  port = 4000,
  onConnect: () => void = () => {},
  onError: (errorType: string) => void = () => {},
) => {
  let close;

  try {
    const sockets: Array<net.Socket> = [];

    const server = net.createServer((socket: any) => {
      socket.on('data', (data: Buffer) => {
        callback(data);
      });
    });

    server.on('error', (error: Error) => {
      if (error.message.indexOf('EADDRINUSE') !== -1) {
        onError('EADDRINUSE');
      }
    });

    server.listen(port, host);

    server.on('connection', (socket: net.Socket) => {
      sockets.push(socket);
      onConnect();
    });

    close = () => {
      server.close();

      sockets.forEach(socket => {
        if (!socket.destroyed) {
          socket.destroy();
        }
      });
    };
  }
  catch (error) {
    console.error(error);
    if (error instanceof RangeError) {
      onError('RANGE');
    }
  }

  return { close };
};

export default Server;
