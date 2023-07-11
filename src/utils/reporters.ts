import allure from "allure-commandline";
import fs from "fs";
import fse from "fs-extra";
import { NewmanRunExecution } from "newman";

import { NewmanOptions, SupermanInput } from "../models";
import { runNewman, runNewmanWithEnvironment } from "./";

function starsAllureServer(port: string | undefined) {

  const gen = allure(["serve", "allure-results", "-p", port ? port : "4444"]);

  console.log(gen)
}

export default async function runNewmanWithReporters(
  list: SupermanInput[],
  options: NewmanOptions
) {
  let results: NewmanRunExecution[] = [];

  if (fse.pathExistsSync("allure-results")) fse.removeSync("allure-results");

  for (let item of list) {
    if (item.collection){
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
    }}
    else console.log("Collection not found")
  }

  fs.writeFileSync("./newman-report.json", JSON.stringify(results, null, 2));

  starsAllureServer(options?.port);

  return Promise.resolve(results.length);
}