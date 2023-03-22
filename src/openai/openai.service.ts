import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {}

  async generateText(
    messages: Array<ChatCompletionRequestMessage>,
  ): Promise<string> {
    this.openai = new OpenAIApi(
      new Configuration({
        organization: this.configService.get<string>('openai.organization'),
        apiKey: this.configService.get<string>('openai.apiKey'),
      }),
    );

    const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages,
    });

    return response.data.choices[0].message.content;
  }
}
