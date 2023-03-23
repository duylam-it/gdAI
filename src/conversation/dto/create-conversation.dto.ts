import { IsBooleanString, IsNotEmpty, Length } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsBooleanString()
  isDeleted: boolean;
}
