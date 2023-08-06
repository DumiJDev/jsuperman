import { NewmanRunExecution } from "newman";

import { NewmanOptions, SupermanInput } from "../entities";

export default interface JSupermanService {
  run(list: SupermanInput[], options: NewmanOptions): Promise<Array<NewmanRunExecution>>;
}
