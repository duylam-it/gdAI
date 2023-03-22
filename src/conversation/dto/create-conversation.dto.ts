import { IsBooleanString, IsNotEmpty, Length } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @Length(1, 10)
  name: string;

  @IsBooleanString()
  isDeleted: boolean;
}
