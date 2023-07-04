import fs from "fs";
import { NewmanRunExecution } from "newman";
import allure from "allure-commandline";

import { NewmanOptions, SupermanInput } from "../models";
import { runNewman, runNewmanWithEnvironment } from "./";

async function generateAllureReport(port: string | undefined) {

  allure(["generate", "./newman-report.json"]);

  allure(["serve", "allure-results", "-p", port ? port : "4444"]);
}

export default async function runNewmanWithReporters(
  list: SupermanInput[],
  options: NewmanOptions
) {
  let results: NewmanRunExecution[] = [];

  for (let item of list) {
    if (item.environment) {
      let executions = await runNewmanWithEnvironment(
        item.collection,
        item.environment,
        options
      );

      results.push(...executions);
    } else {
      let executions = await runNewman(item.collection, options);

      results.push(...executions);
    }
  }

  fs.writeFileSync("./newman-report.json", JSON.stringify(results, null, 2));

  await generateAllureReport(options?.port);

  return Promise.resolve(results.length);
}
