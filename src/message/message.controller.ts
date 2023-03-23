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
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req: any,
    @Response() res: any,
  ) {
    return res.json({
      statusCode: 200,
      data: await this.messageService.create(createMessageDto),
      timestamp: new Date(),
      path: req.path,
    });
  }

  @Get()
  async findAll(@Request() req: any, @Response() res: any) {
    return res.json({
      statusCode: 200,
      data: await this.messageService.findAll(),
      timestamp: new Date(),
      path: req.path,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
