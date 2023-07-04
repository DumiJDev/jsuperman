"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var fs_1 = __importDefault(require("fs"));
var reporters_1 = __importDefault(require("./utils/reporters"));
// Configurar argumentos da linha de comando usando yargs
var argv = yargs_1.default
    .option("globals", {
    alias: "g",
    describe: "Variáveis globais a serem definidas",
    type: "string",
})
    .option("port", {
    alias: "p",
    describe: "Porta onde será acessado o relatório",
    type: "string",
    default: '007'
})
    .option("file", {
    alias: "f",
    describe: "Caminho para o ficheiro onde estão todas as coleções e ambientes",
    type: "string",
    demandOption: true,
}).argv;
// Obtém o caminho do arquivo de configuração do argumento 'config' fornecido via CLI
var configFile = argv.file;
// Carrega as informações do arquivo de configuração
var config = JSON.parse(fs_1.default.readFileSync(configFile, "utf8"));
(0, reporters_1.default)(config, argv)
    .then(function (items) { return console.log("Foram processadas:", items); })
    .catch(function (error) { return console.error(error); });
