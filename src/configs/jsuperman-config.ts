import axios from "axios";
import chalk from "chalk";
import fs from "fs";
import yaml from "yaml";

import { NewmanOptions, SupermanInput } from "../domain/entities";

export default class JSupermanConfig {
  public async buildConfig(options: NewmanOptions): Promise<SupermanInput[]> {
    if (options.file)
      return options.file.endsWith(".yml") || options.file.endsWith(".yaml")
        ? this.buildFromYAML(options.file)
        : this.buildFromJSON(options.file);
    else if (options.url) return this.buildFromUrl(options.url);
    else throw new Error("File or url is required to build configs");
  }

  private async buildFromJSON(file: string) {
    const configFile = file.endsWith(".json") ? file : file + ".json";
    const configFileText = fs.readFileSync(configFile, "utf8");
    return JSON.parse(configFileText) as SupermanInput[];
  }
  private async buildFromYAML(file: string) {
    const configFileText = fs.readFileSync(file, "utf8");
    return yaml.parse(configFileText) as SupermanInput[];
  }

  private async buildFromUrl(url: string) {
    const requestUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `http://${url}`;

    console.log("url:", chalk.blue(requestUrl));

    const { data, status } = await axios.get<SupermanInput[]>(requestUrl);

    if (status !== 200) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  }
}
