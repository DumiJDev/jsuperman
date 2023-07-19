#!/usr/bin/env node

import chalk from "chalk";
import { schedule, validate } from "node-cron";

import { buildConfig } from "./utils";
import args from "./utils/args";
import { beautify } from "./utils/font";
import runNewmanWithReporters, { stopsAllureServer } from "./utils/reporters";

async function main() {
  console.log(chalk.blue(beautify("JSuperman")));

  try {
    if (args.cron) {
      console.log("Scheduled:", chalk.blue(args.cron));

      schedule(
        args.cron && validate(args.cron.replace('"', ""))
          ? args.cron.replace('"', "")
          : "0 0 */2 * * *",
        () => {
          buildConfig(args).then((config) => {
            stopsAllureServer();

            runNewmanWithReporters(config, args).then((items) => {
              console.log("Processed:", items);
            });
          });
        }
      );
    } else {
      buildConfig(args).then((config) => {
        runNewmanWithReporters(config, args).then((items) => {
          console.log("Processed:", items);
        });
      });
    }
  } catch (error: any) {
    console.log("Occurred unexpected error:", chalk.red(error.message));
    process.exit(0);
  }
}

main();
