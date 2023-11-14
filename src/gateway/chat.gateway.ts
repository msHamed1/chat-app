import { UseGuards } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from "src/common/guards/ws-aut.guard";

@WebSocketGateway()
@UseGuards(WsAuthGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server


  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    throw new Error("Method not implemented.");
  }
  
  @SubscribeMessage("newMessage")
  onMessage(@MessageBody() body: any) {
    console.log(body)
    this.server.emit("newMessage",{
      msg:"hi some one send thius ",
      content:body
    })
  }


}