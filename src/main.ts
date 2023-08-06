#!/usr/bin/env node

import chalk from "chalk";
import { schedule, validate } from "node-cron";

import version from "./configs/version";
import JFontService from "./domain/services/jfont-service";
import ArgumentParser from "./configs/args";
import JSupermanConfig from "./configs/jsuperman-config";
import JFontServiceImpl from "./adapters/inbound/jfont-service-impl";
import JSupermanService from "./domain/services/jsuperman-service";
import JAllureServerService from "./domain/services/jallure-service";
import JAllureServerServiceImpl from "./adapters/inbound/jallure-service-impl";
import JSupermanServiceImpl from "./adapters/inbound/jsuperman-service-impl";
import JReportServiceImpl from "./adapters/outbound/jreport-service-impl";
import JMailServiceImpl from "./adapters/outbound/jemail-service-impl";

class JSupermanApp {
  constructor(
    private readonly title: string,
    private readonly args: ArgumentParser,
    private readonly jSupermanService: JSupermanService,
    private readonly jConfigs: JSupermanConfig,
    private readonly jFontService: JFontService,
    private readonly jAllureService: JAllureServerService
  ) {}

  async run() {
    console.log(chalk.blue(this.jFontService.design(this.title)));
    console.log(chalk.bgBlue.white(version), '\n\n');

    const { cron } = this.args.getArgs();

    try {
      if (cron) {
        console.log("Scheduled:", chalk.blue(cron));

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
      const config = await this.jConfigs.buildConfig(this.args.getArgs());
      this.jAllureService.stopsAllureServer();
      const items = await this.jSupermanService.run(
        config,
        this.args.getArgs()
      );
      console.log("Processed:", chalk.blue(items));
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

const allureService = new JAllureServerServiceImpl();

const app = new JSupermanApp(
  title,
  new ArgumentParser(),
  new JSupermanServiceImpl(
    new JReportServiceImpl(),
    allureService,
    new JMailServiceImpl()
  ),
  new JSupermanConfig(),
  new JFontServiceImpl(),
  allureService
);

app.run();
