import { Socket } from 'socket.io';

interface ConnectedClients {
  [id: string]: {client: Socket, user: Object};
}

export class ChatsService {
  private ConnectedClients: ConnectedClients = {};

  registerClient(client: Socket, user: Object) {
    this.ConnectedClients[client.id] = {client, user};
    client.emit('connection', client.id);
  }

  removeClient(client: Socket, clientId: string) {
    delete this.ConnectedClients[clientId];
    client.disconnect();
  }

  getConnectedClients(): any {
    return this.ConnectedClients;
  }

  getOneConnectedClient(clientId: string): any {
    return this.ConnectedClients[clientId];
  }
}
