import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Server } from 'http';
import { Socket } from 'socket.io';
import 'dotenv/config';

@WebSocketGateway(parseInt(process.env.WS_PORT), {
  transports: ['polling'],
  cors: true
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    console.log("WebSocket Gateway Initialized");
    // throw new WsException('Method not implemented.');
  }

  handleDisconnect(client: Socket) {
    // throw new WsException('Method not implemented.');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`${client.id} se conectó`);
    // throw new WsException('Method not implemented.');
  }

}
