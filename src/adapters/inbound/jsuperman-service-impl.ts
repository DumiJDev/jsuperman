import ejs from "ejs";
import { pathExistsSync, readFileSync, removeSync, writeFileSync } from "fs-extra";
import newman, { NewmanRunExecution, NewmanRunOptions, NewmanRunSummary } from "newman";

import { MessageType, NewmanOptions, SupermanInput } from "../../domain/entities";
import JEmailModel from "../../domain/entities/jemail-model";
import JAllureServerService from "../../domain/services/jallure-service";
import JMailService from "../../domain/services/jemail-service";
import JReportService from "../../domain/services/jreport-service";
import JSupermanService from "../../domain/services/jsuperman-service";

export default class JSupermanServiceImpl implements JSupermanService {
  constructor(
    private readonly jReportService: JReportService,
    private readonly jAllureService: JAllureServerService,
    private readonly jMailService: JMailService
  ) {}

  async run(list: SupermanInput[], options: NewmanOptions): Promise<number> {
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
      writeFileSync("./results.json", JSON.stringify(results, null, 2));

    if (options.serve === "allure")
      this.jAllureService.startsAllureServer(options);

    if (options.report)
      await this.jReportService.report({
        executions: results,
        url: options.report,
      });

    if (options.emails) {
      this.jMailService.sendMail(
        new JEmailModel(
          options.emails.map((email) => ({ email })),
          options["email-subject"]!,
          {
            messageType: options["email-content"]?.endsWith(".ejs")
              ? MessageType.HTML
              : MessageType.TEXT,
            content: this.buildEmailContent(options["email-content"]!, results),
          }
        )
      );
    }

    return Promise.resolve(results.length);
  }

  private buildEmailContent(content: string, data?: newman.NewmanRunExecution[]) {
    if (!content.endsWith(".ejs")) return content;

    let template = readFileSync(content, { encoding: "utf8" });

    return ejs.render(template, {extensions: data});
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
