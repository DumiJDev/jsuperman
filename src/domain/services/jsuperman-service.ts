import { SupermanInput, NewmanOptions } from "../entities";

export default interface JSupermanService {
  run(list: SupermanInput[], options: NewmanOptions): Promise<number>;
}
