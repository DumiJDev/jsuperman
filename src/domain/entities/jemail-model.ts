import ejs from "ejs";
import { readFileSync } from "fs-extra";

import { Address, EmailConfig, Message, MessageType } from ".";

export default class JEmailModel {
  static fromConfig(emailConfig: EmailConfig, data: any): JEmailModel {
    let to = emailConfig.to.map((email) => ({ email }));

    let message: Message;

    if (emailConfig.content)
      message = { messageType: MessageType.TEXT, content: emailConfig.content };
    else if (emailConfig.template) {
      const content = ejs.render(
        readFileSync(emailConfig.template, { encoding: "utf8" }),
        data
      );

      message = { messageType: MessageType.HTML, content };
    } else
      message = { messageType: MessageType.TEXT, content: "JSuperman reports" };

    return new JEmailModel(
      to,
      emailConfig.subject || "JSuperman reports",
      message
    );
  }

  readonly simpleMessage: string | undefined;
  readonly htmlMessage: string | undefined;
  readonly to: string;
  readonly subject: string;

  private constructor(to: Array<Address>, subject: string, message: Message) {
    if (message.messageType === MessageType.HTML)
      this.htmlMessage = message.content;
    else if (message.messageType === MessageType.TEXT)
      this.simpleMessage = message.content;

    this.to = to.map(({ email }) => email).join(",");
    this.subject = subject || `Test at ${new Date()}`;
  }
}
