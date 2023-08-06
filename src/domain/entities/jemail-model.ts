import { Address, Message, MessageType } from ".";

export default class JEmailModel {
  readonly simpleMessage: string | undefined;
  readonly htmlMessage: string | undefined;
  readonly to: string;
  readonly subject: string;

  constructor(
    to: Array<Address>,
    subject: string,
    message: Message
  ) {
    if (message.messageType === MessageType.HTML)
      this.htmlMessage = message.content;
    else if (message.messageType === MessageType.TEXT)
      this.simpleMessage = message.content;

    
    this.to = to.map(({ email }) => email).join(",");
    this.subject = subject || `Test at ${new Date()}`;
  }
}