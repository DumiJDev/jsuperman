import { NewmanRunExecution } from "newman";

export default interface RestService {
  getResults(params: {
    page?: number | string;
    size?: number | string;
  }): Array<NewmanRunExecution>;
}
