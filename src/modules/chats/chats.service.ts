import { Socket } from 'socket.io';

interface ConnectedClients {
  [id: string]: Socket;
}

export class ChatsService {
  private ConnectedClients: ConnectedClients = {};

  registerClient(client: Socket) {
    this.ConnectedClients[client.id] = client;
    client.emit('connection', client.id);
  }

  removeClient(client: Socket, clientId: string) {
    delete this.ConnectedClients[clientId];
    client.disconnect();
  }

  getConnectedClients(): any {
    return this.ConnectedClients;
  }
}
