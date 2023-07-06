import { NewmanOptions } from "../models";
import yargs from "yargs";

export default yargs
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