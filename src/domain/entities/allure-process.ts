import { ChildProcess } from "child_process";

export default class AllureProcess {
  private static allureProcess?: { process: ChildProcess | null };

  public static getAllureProcess() {
    if (!AllureProcess.allureProcess) {
      AllureProcess.allureProcess = { process: null };
    }

    return AllureProcess.allureProcess;
  }
}
