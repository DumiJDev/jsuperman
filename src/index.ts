#!/usr/bin/env node

import fs from "fs";
import { SupermanInput } from "./models";
import runNewmanWithReporters from "./utils/reporters";
import figlet from "figlet";
import args from "./utils/args";

// Obtém o caminho do arquivo de configuração do argumento 'config' fornecido via CLI
const configFile = args.file.endsWith(".json") ? args.file : args.file + ".json";

console.log(
  `\x1b[34m${figlet.textSync("Superman cli", { font: "Doom" })}\x1b[0m`
);

// Carrega as informações do arquivo de configuração
const config = JSON.parse(
  fs.readFileSync(configFile, "utf8")
) as SupermanInput[];

runNewmanWithReporters(config, args)
  .then((items) => console.log("Foram processadas:", items))
  .catch((error) => console.error(error));
