import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { Conversation } from 'src/conversation/schemas/conversation.schema';
import { OpenaiService } from 'src/openai/openai.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    private readonly openaiService: OpenaiService,
    private configService: ConfigService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<string> {
    if (['sex', '18+', 'mẹ mày', 'ngu'].includes(createMessageDto.content))
      throw new HttpException(
        'Words are not age appropriate',
        HttpStatus.BAD_REQUEST,
      );

    const conversation = await this.conversationModel.findById(
      createMessageDto.conversationId,
    );

    if (!conversation) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const messages: Array<object> = await this.messageModel.find({
      conversationId: createMessageDto.conversationId,
    });

    const requestMessage: Array<ChatCompletionRequestMessage> = messages.map(
      (message: CreateMessageDto) => {
        return {
          role: message.isAssistantMessage
            ? ChatCompletionRequestMessageRoleEnum.Assistant
            : ChatCompletionRequestMessageRoleEnum.User,
          content: message.content,
        };
      },
    );

    requestMessage.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: createMessageDto.content,
    });

    requestMessage.unshift({
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: this.configService.get<string>('openai.contentFirst'),
    });

    console.log(requestMessage);
    await this.messageModel.create(createMessageDto);

    const aiMess = await this.openaiService.generateText(requestMessage);

    createMessageDto.isAssistantMessage = true;
    createMessageDto.content = aiMess;

    await this.messageModel.create(createMessageDto);

    return aiMess;
  }

  async findAll() {
    return 'áda';
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
