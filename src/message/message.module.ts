import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationShema,
} from 'src/conversation/schemas/conversation.schema';
import { OpenaiService } from 'src/openai/openai.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message, MessageShema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationShema },
      { name: Message.name, schema: MessageShema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, OpenaiService],
})
export class MessageModule {}
