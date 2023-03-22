import { IsBooleanString, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  conversationId: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsBooleanString()
  isAssistantMessage: boolean;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsBooleanString()
  isDeleted: boolean;
}
