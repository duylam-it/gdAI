export class MessageDto {
  conversationId: string;
  content: string;
  isAssistantMessage: boolean;
  type: string;
  isDeleted: boolean;
}
