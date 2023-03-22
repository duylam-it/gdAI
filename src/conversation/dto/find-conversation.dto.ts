import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindConversationDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
