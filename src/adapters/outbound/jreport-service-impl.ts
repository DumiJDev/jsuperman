import axios from "axios";
import chalk from "chalk";
import { ReportOptions } from "../../domain/entities";
import JReportService from "../../domain/services/jreport-service";

export default class JReportServiceImpl implements JReportService {
  async report(options: ReportOptions): Promise<void> {
    console.log("Reporting to:", chalk.blue(options.url));

    let { data, status } = await axios.post(options.url, options.executions);

    if (![200, 201, 204].includes(status))
      throw new Error(
        `Server respond with error, code: ${status}, message: ${JSON.stringify(
          data
        )}`
      );
  }
}
