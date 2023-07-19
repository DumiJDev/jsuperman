import allure from "allure-commandline";
import { ChildProcess } from "child_process";
import fs from "fs";
import fse from "fs-extra";
import { NewmanRunExecution } from "newman";
import kill from 'tree-kill'

import { NewmanOptions, SupermanInput } from "../models";
import { runNewman, runNewmanWithEnvironment } from "./";

let gen: ChildProcess | null = null;

function startsAllureServer({ port, quiet }: NewmanOptions): ChildProcess {
  const commands: Array<string> = [];

  if (quiet) commands.push("-q");

  commands.push(...["serve", "allure-results", "-p", port ? port : "1999"]);

  return allure(commands) as ChildProcess;
}

export function stopsAllureServer() {
  if (gen) {
    if (gen.pid) {
      kill(gen.pid, "SIGINT");
      gen = null
    }
  }
}

export default async function runNewmanWithReporters(
  list: SupermanInput[],
  options: NewmanOptions
) {
  let results: NewmanRunExecution[] = [];

  if (fse.pathExistsSync("allure-results")) fse.removeSync("allure-results");

  for (let item of list) {
    if (item.collection) {
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
    } else console.log("Collection not found");
  }

  fs.writeFileSync("./newman-report.json", JSON.stringify(results, null, 2));

  gen = startsAllureServer(options);

  return Promise.resolve(results.length);
}
