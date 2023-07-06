#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var reporters_1 = __importDefault(require("./utils/reporters"));
var figlet_1 = __importDefault(require("figlet"));
var args_1 = __importDefault(require("./utils/args"));
// Obtém o caminho do arquivo de configuração do argumento 'config' fornecido via CLI
var configFile = args_1.default.file.endsWith(".json") ? args_1.default.file : args_1.default.file + ".json";
console.log("\u001B[34m".concat(figlet_1.default.textSync("Superman cli", { font: "Doom" }), "\u001B[0m"));
// Carrega as informações do arquivo de configuração
var config = JSON.parse(fs_1.default.readFileSync(configFile, "utf8"));
(0, reporters_1.default)(config, args_1.default)
    .then(function (items) { return console.log("Foram processadas:", items); })
    .catch(function (error) { return console.error(error); });
