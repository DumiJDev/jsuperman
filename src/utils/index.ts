import chalk from 'chalk';
import fs from "fs";
import { NewmanOptions, SupermanInput } from "../models";
import newman, {
  NewmanRunExecution,
  NewmanRunOptions,
  NewmanRunSummary,
} from "newman";

import axios from "axios";

export async function runNewmanWithEnvironment(
  collection: string,
  environment: string,
  options: NewmanOptions | undefined
): Promise<NewmanRunExecution[]> {
  const newmanOptions: NewmanRunOptions = {
    collection: collection,
    environment: environment,
    reporters: ["cli", "htmlextra", "allure"],
    reporter: {
      htmlextra: {
        browserTitle: "Superman reports",
        title: "Superman reports",
      },
    },
    globals: options?.globals,
    iterationCount: options?.iteration ? options.iteration : 1,
  };

  return new Promise((resolve, reject) => {
    newman.run(
      newmanOptions,
      (error: Error | null, summary: NewmanRunSummary) => {
        if (error) {
          reject(error);
        } else {
          resolve(summary.run.executions);
        }
      }
    );
  });
}

export async function runNewman(
  collection: string,
  options: NewmanOptions | undefined
): Promise<NewmanRunExecution[]> {
  const newmanOptions: NewmanRunOptions = {
    collection: collection,
    reporters: ["cli", "htmlextra", "allure"],
    reporter: {
      htmlextra: {
        browserTitle: "Superman reports",
        title: "Superman reports",
      },
    },
    globals: options?.globals,
    iterationCount: options?.iteration ? options.iteration : 1,
  };

  return new Promise((resolve, reject) => {
    newman.run(
      newmanOptions,
      (error: Error | null, summary: NewmanRunSummary) => {
        if (error) {
          reject(error);
        } else {
          resolve(summary.run.executions);
        }
      }
    );
  });
}

export async function buildConfig({
  file,
  url,
}: NewmanOptions): Promise<SupermanInput[]> {
  if (file) {
    const configFile = file?.endsWith(".json") ? file : file + ".json";

    return JSON.parse(fs.readFileSync(configFile, "utf8")) as SupermanInput[];

  } else if (url) {
    const requestUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`
    console.log("url:", chalk.blue(requestUrl))
    const { data, status } = await axios.get(requestUrl);

    if (status !== 200) {
      throw new Error(data as string);
    }

    return data;
  } else throw new Error("File or url config is required");
}
