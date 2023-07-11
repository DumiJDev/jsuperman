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
})
    .option("url", {
    alias: "u",
    describe: "Url para acessar o as coleções e ambientes",
    type: "string"
})
    .option("file", {
    alias: "f",
    describe: "Caminho para o ficheiro onde estão todas as coleções e ambientes",
    type: "string"
}).argv;
