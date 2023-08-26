import { NewmanRunExecution } from "newman";
import RestService from "../../domain/services/rest-service";
import { readFileSync } from "fs-extra";
import { OutputResult } from "../../domain/entities";

export default class RestServiceImpl implements RestService {
  getResults(): Array<NewmanRunExecution> {
    try {
      const fileStr = readFileSync(OutputResult.Path, { encoding: "utf8" });

      return fileStr ? JSON.parse(fileStr) : [];
    } catch (error) {
      return [];
    }
  }
}
