import newman, {
  NewmanRunExecution,
  NewmanRunOptions,
  NewmanRunSummary,
} from "newman";

import { NewmanOptions } from "../models";

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
    iterationCount: options?.iteration ? options.iteration : 1
  };

  return new Promise((resolve, reject) => {
    newman.run(
      newmanOptions,
      (error: Error | null, summary: NewmanRunSummary) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(summary.run.executions)
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
    iterationCount: options?.iteration ? options.iteration : 1
  };

  return new Promise((resolve, reject) => {
    newman.run(
      newmanOptions,
      (error: Error | null, summary: NewmanRunSummary) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(summary.run.executions)
        }
      }
    );
  });
}
