import yargs from "yargs";

import { NewmanOptions } from "../models";

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
  .option("url", {
    alias: "u",
    describe: "Url para acessar o as coleções e ambientes",
    type: "string",
  })
  .option("serve", {
    alias: "s",
    describe: "Opção para rodar o servidor após a geração do relatório",
    type: "boolean",
    default: false,
  })
  .option("report", {
    alias: "r",
    describe: "Url onde se deseja enviar os resultados dos reportes",
    type: "string",
  })
  .option("file", {
    alias: "f",
    describe:
      "Caminho para o ficheiro onde estão todas as coleções e ambientes",
    type: "string",
  }).argv as NewmanOptions;
