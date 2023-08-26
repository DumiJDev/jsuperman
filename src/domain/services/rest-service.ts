import { NewmanRunExecution } from "newman";

export default interface RestService {
  getResults(): Array<NewmanRunExecution>;
}
