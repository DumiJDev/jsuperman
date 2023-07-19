"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
exports.default = yargs_1.default
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
    default: 1
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
    .option("export", {
    alias: "e",
    describe: "Caminho para onde sedeseja exportar os resultados em json",
    type: "string"
}).option("quiet", {
    alias: "q",
    describe: "Indicador para rodar o servidor em modo quiet",
    type: "boolean",
    default: false
})
    .option("cron", {
    alias: "c",
    describe: "",
    type: "string"
})
    .option("file", {
    alias: "f",
    describe: "Caminho para o ficheiro onde estão todas as coleções e ambientes",
    type: "string",
}).argv;