import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { FindConversationDto } from './dto/find-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './schemas/conversation.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  async create(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return await this.conversationModel.create(createConversationDto);
  }

  async findAll(): Promise<object> {
    return await this.conversationModel.find();
  }

  async findOne(findConversationDto: FindConversationDto): Promise<object> {
    const conversation = await this.conversationModel.findById(
      findConversationDto.id,
    );
    if (!conversation)
      throw new HttpException('Not found conversation', HttpStatus.NOT_FOUND);

    return conversation;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} Conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} Conversation`;
  }
}
