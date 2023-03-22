import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/message/schemas/message.schema';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { FindConversationDto } from './dto/find-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './schemas/conversation.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return await this.conversationModel.create(createConversationDto);
  }

  findAll() {
    return `This action returns all Conversation`;
  }

  async findOne(findConversationDto: FindConversationDto): Promise<object> {
    const conversation = await this.conversationModel.findById(
      findConversationDto.id,
    );
    const conversationAndMessage = {
      ...conversation.toJSON(),
      messages: await this.messageModel.find({
        conversationId: findConversationDto.id,
      }),
    };
    console.log(conversationAndMessage);
    return conversationAndMessage;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} Conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} Conversation`;
  }
}
