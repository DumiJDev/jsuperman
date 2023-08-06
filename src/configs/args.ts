import { readFileSync } from "fs-extra";
import yargs from "yargs";

import { EmailConfig, NewmanOptions } from "../domain/entities";

export default class ArgumentParser {
  private argv: NewmanOptions;

  constructor() {
    this.argv = yargs
      .option("globals", {
        alias: "g",
        describe: "Set global variables for the test execution.",
        type: "string",
      })
      .option("port", {
        alias: "p",
        describe: "Specify the port for accessing the generated report.",
        type: "string",
      })
      .option("iteration", {
        alias: "i",
        describe: "Number of test execution iterations (default is 1).",
        type: "number",
        default: 1,
      })
      .option("url", {
        alias: "u",
        describe: "URL to access test collections and environments.",
        type: "string",
      })
      .option("serve", {
        alias: "s",
        describe: "Run a server after generating the report for easy access.",
        type: "string",
        coerce(arg) {
          return arg === "" ? "allure" : arg;
        },
      })
      .option("native", {
        alias: "n",
        describe: "Use the native reporter to generate the report.",
        type: "boolean",
        default: false,
      })
      .option("report", {
        alias: "r",
        describe: "URL to send the report results after test execution.",
        type: "string",
      })
      .option("export", {
        alias: "e",
        describe: "Export test results to a JSON file at the specified path.",
        type: "string",
      })
      .option("quiet", {
        alias: "q",
        describe: "Run the server in quiet mode to minimize log output.",
        type: "boolean",
        default: false,
      })
      .option("cron", {
        alias: "c",
        describe: "Schedule jsuperman to run using a cron expression.",
        type: "string",
      })
      .option("email-config", {
        alias: "e",
        describe:
          "SMTP configuration in key:value format separated by semicolons.",
        type: "string",
        coerce(arg) {
          if (!arg) {
            return null;
          }

          return JSON.parse(
            readFileSync(arg.endsWith(".json") ? arg : arg + ".json", {
              encoding: "utf8",
            })
          ) as EmailConfig;
        },
      })
      .option("file", {
        alias: "f",
        describe: "Path to a file containing collections and environments.",
        type: "string",
      }).argv as NewmanOptions;
  }

  public getArgs(): NewmanOptions {
    return this.argv;
  }
}
