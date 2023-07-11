#!/usr/bin/env node

import args from "./utils/args";
import runNewmanWithReporters from "./utils/reporters";
import { beautify } from "./utils/font";
import { buildConfig } from "./utils";
import chalk from "chalk";

async function main() {
  console.log(chalk.blue(beautify("JSuperman")));

  try {
    const config = await buildConfig(args);

    const items = await runNewmanWithReporters(config, args);

    console.log("Processed:", items);
  } catch (error: any) {
    console.log("Occurred unexpected error:", chalk.red(error.message));
    process.exit(0);
  }
}

main();
