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
import { AuthService } from '../auth/auth.service';
import { GeneralError } from 'src/utils/enums/errors/general-error.enum';
import { RoomsService } from '../rooms/rooms.service';
import { UserDto } from '../users/dto/user.dto';
import { RoomError } from 'src/utils/enums/errors/room-error.enum';

@WebSocketGateway(+process.env.WS_PORT!, {
  cors: {
    origin: '*',
  },
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatsService: ChatsService,
    private readonly authService: AuthService,
    private readonly roomService: RoomsService,
  ) {}

  private connectedClient: any;
  private user: UserDto;

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Starting WebSocket server...');
  }

  async handleConnection(client: Socket) {
    try {
      const user = await this.authenitcate(client);
      this.chatsService.registerClient(client, user);
      this.connectedClient = await this.chatsService.getOneConnectedClient(
        client.id,
      );
      this.user = this.connectedClient.user;
    } catch (e) {
      client.disconnect();
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
  async handleMessage(client: Socket, id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new WsException(GeneralError.notValidId);
      }

      const room = await this.getRoom(id);
      if (!room) {
        throw new WsException(RoomError.notFound);
      }

      const roomId = room._id.toString();
      client.join(roomId);
      console.log(`${this.user.name} se unio a la sala ${roomId}`);
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, roomId: string) {
    try {
      if (!Types.ObjectId.isValid(roomId)) {
        throw new WsException(GeneralError.notValidId);
      }

      const room = await this.getRoom(roomId);
      if (!room) {
        throw new WsException(RoomError.notFound);
      }

      client.leave(room._id.toString());
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
  async clientJoinedRoomCheck(client: Socket) {
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
        throw new WsException(GeneralError.notValidId);
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

  async authenitcate(client: Socket) {
    const bearerToken = client.handshake.query.token as string;
    if (!bearerToken) {
      throw new WsException(GeneralError.requiredToken);
    }
    const token = bearerToken.split(' ')[1];

    if (!token) {
      throw new WsException(GeneralError.notValidToken);
    }

    return await this.authService.decodedToken(token);
  }

  async getRoom(roomId: string) {
    return await this.roomService.findOneById(roomId);
  }
}
