import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { FindConversationDto } from './dto/find-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller('Conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  async findAll(@Request() req: any, @Response() res: any) {
    return res.json({
      statusCode: 200,
      data: await this.conversationService.findAll(),
      timestamp: new Date(),
      path: req.path,
    });
  }

  @Get(':id')
  async findOne(
    @Param() findConversationDto: FindConversationDto,
    @Request() req: any,
    @Response() res: any,
  ) {
    return res.json({
      statusCode: 200,
      data: await this.conversationService.findOne(findConversationDto),
      timestamp: new Date(),
      path: req.path,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
