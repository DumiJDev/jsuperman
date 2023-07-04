import yargs from "yargs";

import fs from "fs";
import { NewmanOptions, SupermanInput } from "./models";
import runNewmanWithReporters from "./utils/reporters";
import figlet from "figlet";

// Configurar argumentos da linha de comando usando yargs
const argv = yargs
  .option("globals", {
    alias: "g",
    describe: "Variáveis globais a serem definidas",
    type: "string",
  })
  .option("port", {
    alias: "p",
    describe: "Porta onde será acessado o relatório",
    type: "string",
  })
  .option("iteration", {
    alias: "i",
    describe: "Número de iterações",
    type: "number",
  })
  .option("file", {
    alias: "f",
    describe:
      "Caminho para o ficheiro onde estão todas as coleções e ambientes",
    type: "string",
    demandOption: true,
  }).argv as NewmanOptions;

// Obtém o caminho do arquivo de configuração do argumento 'config' fornecido via CLI
const configFile = argv.file.endsWith(".json") ? argv.file : argv.file + ".json";

console.log(
  `\x1b[34m${figlet.textSync("Superman cli", { font: "Doom" })}\x1b[0m`
);

// Carrega as informações do arquivo de configuração
const config = JSON.parse(
  fs.readFileSync(configFile, "utf8")
) as SupermanInput[];

runNewmanWithReporters(config, argv)
  .then((items) => console.log("Foram processadas:", items))
  .catch((error) => console.error(error));
