import { Message } from 'src/message/schemas/message.schema';

export class ConversationDto {
  name: string;
  isDeleted: boolean;
  messages: Array<Message>;
}
