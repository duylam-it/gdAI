import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Conversation } from 'src/conversation/schemas/conversation.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' })
  conversationId: Conversation;

  @Prop()
  content: string;

  @Prop()
  isAssistantMessage: boolean;

  @Prop()
  type: string;

  @Prop()
  isDeleted: boolean;
}

export const MessageShema = SchemaFactory.createForClass(Message);
