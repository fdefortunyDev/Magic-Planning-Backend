import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  OnGatewayInit,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatsService } from './chats.service';
import { Types } from 'mongoose';
import 'dotenv/config';

// @UseGuards(JwtAuthGuard)
@WebSocketGateway(+process.env.WS_PORT!, {
  cors: {
    origin: '*',
  },
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('antes de iniciar');
  }

  async handleConnection(client: Socket) {
    try {
      this.chatsService.registerClient(client);
    } catch (e) {
      console.error(e);
    }
  }

  handleDisconnect(client: Socket) {
    try {
      this.chatsService.removeClient(client, client.id);
      this.server.emit('ClientDisconnected', { clientId: client.id });
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleMessage(client: Socket, roomId: string) {
    try {
      if (!Types.ObjectId.isValid(roomId)) {
        throw new WsException(`${roomId} is not a valid id`);
      }
      const room = roomId;
      client.join(room);
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, roomId: string) {
    try {
      if (!Types.ObjectId.isValid(roomId)) {
        throw new WsException(`${roomId} is not a valid id`);
      }
      const room = roomId;
      client.leave(room);
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('leaveRooms')
  async leaveRooms(client: Socket) {
    try {
      client.rooms.forEach((room) => {
        if (client.id !== room) {
          client.leave(room);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('checkClientJoinedInSomeRoom')
  async clientJoinedRoomCheck(client: Socket, email: string) {
    try {
      const isAlreadyInRoom = [...client.rooms].some(
        (value) => value !== client.id,
      );
      this.server.to(client.id).emit('isAlreadyInRoom', isAlreadyInRoom);
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('clientDisconnect')
  async clientDisconnect(client: Socket) {
    this.handleDisconnect(client);
  }

  async emitToAllClientsInRoom(
    room: string,
    event: string,
    @MessageBody() payload: any,
    userName: string,
  ) {
    const projectId = room;
    try {
      if (!Types.ObjectId.isValid(projectId)) {
        throw new WsException(`${projectId} is not a valid id`);
      }
    } catch (e) {
      console.error(e);
    }

    try {
      this.server.to(room).emit(event, { payload, userName });
    } catch (e) {
      console.error(e);
    }
  }

  async getAllConnectedClients() {
    try {
      return this.chatsService.getConnectedClients();
    } catch (e) {
      console.error(e);
    }
  }
}
