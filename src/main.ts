#!/usr/bin/env node

import chalk from "chalk";
import { schedule, validate } from "node-cron";

import JFontServiceImpl from "./adapters/inbound/jfont-service-impl";
import JSupermanServiceImpl from "./adapters/inbound/jsuperman-service-impl";
import JMailServiceImpl from "./adapters/outbound/jemail-service-impl";
import JReportServiceImpl from "./adapters/outbound/jreport-service-impl";
import ArgumentParser from "./configs/args";
import JSupermanConfig from "./configs/jsuperman-config";
import version from "./configs/version";
import JEmailModel from "./domain/entities/jemail-model";
import JFontService from "./domain/services/jfont-service";
import JSupermanService from "./domain/services/jsuperman-service";
import express from "express";
import JRestService from "./domain/services/rest-service";
import JRestServiceImpl from "./adapters/inbound/rest-service-impl";

class JSupermanApp {
  constructor(
    private readonly title: string,
    private readonly args: ArgumentParser,
    private readonly jss: JSupermanService,
    private readonly jc: JSupermanConfig,
    private readonly jfs: JFontService,
    private readonly jrs: JRestService
  ) {}

  async run() {
    console.log(chalk.blue(this.jfs.design(this.title)));
    console.log(
      chalk.bold.bgBlue.white("\t\t\t\t\t\t[" + version + "]"),
      "\n\n"
    );

    const { cron, rest, port } = this.args.getArgs();

    try {
      if (rest) {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ limit: "10mb", extended: true }));

        app.get("/jsuperman/results", (req, res) => {
          const { page, size } = req.query;
          res.send(
            this.jrs.getResults({ page: page as string, size: size as string })
          );
        });

        app.listen(port ? port : 7777, () =>
          console.log(
            "Listen in port",
            chalk.bgYellow.bold.white(port ? port : 7777)
          )
        );
      }

      if (cron) {
        console.log("Scheduled:", chalk.bgBlue.bold.white(cron));

        schedule(
          validate(cron.replace('"', ""))
            ? cron.replace('"', "")
            : "0 0 */2 * * *",
          () => {
            this.execute();
          }
        );
      } else {
        this.execute();
      }
    } catch (error) {
      console.log(
        "Occurred unexpected error:",
        chalk.red((error as any).message)
      );
      process.exit(0);
    }
  }

  async execute() {
    try {
      const config = await this.jc.buildConfig(this.args.getArgs());
      const executions = await this.jss.run(config, this.args.getArgs());

      const emailConfig = this.args.getArgs()["email-config"];

      if (emailConfig) {
        const emailService = JMailServiceImpl.getInstance(emailConfig);

        await emailService.sendMail(
          JEmailModel.fromConfig(emailConfig, executions)
        );
      }

      console.log("Processed:", chalk.blue(executions.length));
    } catch (error) {
      console.log(
        "Occurred unexpected error:",
        chalk.red((error as any).message)
      );
      process.exit(0);
    }
  }
}

const title = "JSuperman";
const args = new ArgumentParser();
const app = new JSupermanApp(
  title,
  args,
  new JSupermanServiceImpl(new JReportServiceImpl()),
  new JSupermanConfig(),
  new JFontServiceImpl(),
  new JRestServiceImpl()
);

app.run();
