import chalk from "chalk";
import { createTransport, Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { Address, EmailConfig } from "../../domain/entities";
import JEmailModel from "../../domain/entities/jemail-model";
import JMailService from "../../domain/services/jemail-service";

export default class JMailServiceImpl implements JMailService {
  static getInstance(config: EmailConfig) {
    if (this.instance === null) {
      this.instance = new JMailServiceImpl(config);
    }

    return this.instance;
  }
  private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly from: Address;
  private static instance: JMailService | null = null;

  private constructor({ from, smtp }: EmailConfig) {
    const conObj: SMTPTransport.Options = {};

    conObj.host = smtp.host;
    conObj.port = smtp.port;
    conObj.secure = smtp.secure;

    if (smtp.auth) {
      conObj.auth = { pass: smtp.auth.pass, user: smtp.auth.user };
    }

    this.transport = createTransport(conObj);
    this.from = from;
  }

  async sendMail(emailModel: JEmailModel): Promise<void> {
    const options = this.buildMessageOptions(emailModel);

    const a = await this.transport.sendMail(options);

    if (a.accepted.length) {
      console.log(chalk.green("Accepted:"));
      a.accepted.forEach((acc) =>
        console.log("-", chalk.green(acc.toString()))
      );
    }

    if (a.pending) {
      console.log(chalk.yellow("\nPending:"));
      a.pending.forEach((acc) => console.log("-", chalk.yellow(acc.toString())));
    }

    if (a.rejected.length) {
      console.log(chalk.red("\nRejected:"));
      a.rejected.forEach((acc) => console.log("-", chalk.red(acc.toString())));
    }
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
