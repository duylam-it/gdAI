import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true })
export class Conversation {
  @Prop()
  name: string;

  @Prop()
  isDeleted: boolean;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Message',
    default: [],
    autopopulate: true,
  })
  messages: Array<mongoose.Types.ObjectId>;
}

export const ConversationShema = SchemaFactory.createForClass(
  Conversation,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
).plugin(require('mongoose-autopopulate'));
