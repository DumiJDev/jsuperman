
import { pathExistsSync, removeSync, writeFileSync } from "fs-extra";
import newman, { NewmanRunExecution, NewmanRunOptions, NewmanRunSummary } from "newman";

import { NewmanOptions, OutputResult, SupermanInput } from "../../domain/entities";
import JAllureServerService from "../../domain/services/jallure-service";
import JReportService from "../../domain/services/jreport-service";
import JSupermanService from "../../domain/services/jsuperman-service";

export default class JSupermanServiceImpl implements JSupermanService {
  constructor(
    private readonly jReportService: JReportService,
    private readonly jAllureService: JAllureServerService,
  ) {}

  async run(list: SupermanInput[], options: NewmanOptions): Promise<Array<NewmanRunExecution>> {
    const results: NewmanRunExecution[] = [];

    if (pathExistsSync("allure-results")) removeSync("allure-results");

    for (let item of list) {
      if (item.collection) {
        if (item.environment) {
          let executions = await this.runWithEnv(
            item.collection,
            item.environment,
            options
          );

          results.push(...executions);
        } else {
          let executions = await this.runWithoutEnv(item.collection, options);

          results.push(...executions);
        }
      } else console.log("Collection not found");
    }

    if (options.export)
      writeFileSync(OutputResult.Path, JSON.stringify(results, null, 2));

    if (options.serve === "allure")
      this.jAllureService.startsAllureServer(options);

    if (options.report)
      await this.jReportService.report({
        executions: results,
        url: options.report,
      });

    return Promise.resolve(results);
  }

  private async runNewman(
    newmanOptions: NewmanRunOptions
  ): Promise<NewmanRunExecution[]> {
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

  private async runWithEnv(
    collection: string,
    environment: string,
    options: NewmanOptions | undefined
  ): Promise<NewmanRunExecution[]> {
    const newmanOptions: NewmanRunOptions = {
      collection: collection,
      environment: environment,
      reporters: ["cli", "allure"],
      globals: options?.globals,
      iterationCount: options?.iteration ? options.iteration : 1,
    };

    return this.runNewman(newmanOptions);
  }

  private async runWithoutEnv(
    collection: string,
    options: NewmanOptions | undefined
  ): Promise<NewmanRunExecution[]> {
    const newmanOptions: NewmanRunOptions = {
      collection: collection,
      reporters: ["cli", "allure"],
      globals: options?.globals,
      iterationCount: options?.iteration ? options.iteration : 1,
    };

    return this.runNewman(newmanOptions);
  }
}
