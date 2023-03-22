import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true })
export class Conversation {
  @Prop()
  name: string;

  @Prop()
  isDeleted: boolean;
}

export const ConversationShema = SchemaFactory.createForClass(Conversation);
