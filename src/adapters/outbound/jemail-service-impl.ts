import chalk from "chalk";
import { createTransport, Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { Address } from "../../domain/entities";
import JEmailModel from "../../domain/entities/jemail-model";
import JMailService from "../../domain/services/jemail-service";

export default class JMailServiceImpl implements JMailService {
  private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly from: Address;

  constructor(connectionStr: string) {
    const regex = /[a-z]+:[A-Za-z0-9@]+/g;
    let name: string = '', email: string = ''

    if (!regex.test(connectionStr))
      throw new Error(
        "email pattern is wrong, a pattern valid is 'key:value;key1:value'"
      );

    const conObj: SMTPTransport.Options = {};

    connectionStr.split(";").forEach((item) => {
      const [key, value] = item.split(":");

      if (key.toLowerCase() === "host") conObj.host = value;
      else if (key.toLowerCase() === "port") conObj.port = parseInt(value);
      else if (key.toLowerCase() === "auth") {
        const [user, pass] = value.split("@");

        conObj.auth = { user, pass };
      } else if (key.toLowerCase() === "from") {
        const [name1, email1] = value.split("@");
        name = name1
        email = email1
      }
    });

    this.transport = createTransport(conObj);
    this.from = { name, email };
  }

  async sendMail(emailModel: JEmailModel): Promise<void> {
    const options = this.buildMessageOptions(emailModel);

    const a = await this.transport.sendMail(options);

    console.log(chalk.green("Accepted:"));
    a.accepted.forEach((acc) => console.log("-", chalk.green(acc.toString)));

    console.log(chalk.yellow("\nPending:"));
    a.pending.forEach((acc) => console.log("-", chalk.yellow(acc.toString)));

    console.log(chalk.red("\nRejected:"));
    a.rejected.forEach((acc) => console.log("-", chalk.red(acc.toString)));
  }

  private buildSenderOptions() {}

  private buildMessageOptions(emailModel: JEmailModel): Mail.Options {
    const message: Mail.Options = {};
    message.from = `"${this.from.name}" ${this.from.email}`;
    message.to = emailModel.to;
    if (emailModel.htmlMessage) message.html = emailModel.htmlMessage;
    else if (emailModel.simpleMessage) message.text = emailModel.simpleMessage;

    message.subject = emailModel.subject;

    return message;
  }
}
