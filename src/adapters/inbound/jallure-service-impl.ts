import allure from 'allure-commandline';
import { NewmanOptions } from "../../domain/entities";
import AllureProcess from "../../domain/entities/allure-process";
import JAllureServerService from "../../domain/services/jallure-service";
import kill from 'tree-kill';

export default class JAllureServerServiceImpl implements JAllureServerService {
    
  startsAllureServer({quiet, port}: NewmanOptions): void {
    const commands: string[] = [];

    if (quiet) commands.push("-q");

    commands.push(...["serve", "allure-results", "-p", port ? port : "1999"]);

    AllureProcess.getAllureProcess().process = allure(commands);
  }

  stopsAllureServer(): void {
    if (AllureProcess.getAllureProcess().process) {
        if (AllureProcess.getAllureProcess().process?.pid) {
          kill(AllureProcess.getAllureProcess().process?.pid!, "SIGINT");
          AllureProcess.getAllureProcess().process = null;
        }
      }
  }
}
