import fs from "fs";
import { NewmanRunExecution } from "newman";
import htmlextra from "newman-reporter-htmlextra";
import allure from "allure-commandline";

import { NewmanOptions, SupermanInput } from "../models";
import { runNewman, runNewmanWithEnvironment } from "./";

async function generateAllureReport(port: string | undefined) {
  const reportPath = "./allure-report";

  let generation = allure([
    "generate",
    "./newman-report",
    "--output",
    reportPath,
    "-p",
    port ? port : "4444"
  ]);

  console.log(generation)

  generation.on("exit", function (exitCode: any) {
    console.log("Generation is finished with code:", exitCode);
  });

  console.log("Relatório do Allure gerado em:", reportPath);
}

async function generateHtmlExtraReport() {
  const reportPath = "./htmlextra-report";
  const options = {
    reportTitle: "Relatório do Newman",
    outputPath: reportPath,
  };
  htmlextra("./newman-report.json", options);

  console.log("Relatório HTML Extra gerado em:", reportPath);
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

  await generateHtmlExtraReport();

  return Promise.resolve(results.length);
}
