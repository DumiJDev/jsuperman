"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var ArgumentParser = /** @class */ (function () {
    function ArgumentParser() {
        this.argv = yargs_1.default
            .option("globals", {
            alias: "g",
            describe: "Define global variables to be used during the test execution.",
            type: "string",
        })
            .option("port", {
            alias: "p",
            describe: "Specify the port where the generated report will be accessed.",
            type: "string",
        })
            .option("iteration", {
            alias: "i",
            describe: "Set the number of iterations for test execution. Default is 1.",
            type: "number",
            default: 1,
        })
            .option("url", {
            alias: "u",
            describe: "URL to access collections and environments for the test.",
            type: "string",
        })
            .option("serve", {
            alias: "s",
            describe: "Run the server after generating the report for easy access.",
            type: "string",
            coerce: function (arg) {
                return arg === '' ? "allure" : arg;
            },
        })
            .option("native", {
            alias: "n",
            describe: "Use the native reporter to generate the report.",
            type: "boolean",
            default: false,
        })
            .option("report", {
            alias: "r",
            describe: "URL where to send the report results after test execution.",
            type: "string",
        })
            .option("export", {
            alias: "e",
            describe: "Specify the path to export the test results as JSON.",
            type: "string",
        })
            .option("quiet", {
            alias: "q",
            describe: "Run the server in quiet mode to minimize log output.",
            type: "boolean",
            default: false,
        })
            .option("cron", {
            alias: "c",
            describe: "Schedule jsuperman to run on a specified time using cron expression.",
            type: "string",
        })
            .option("email", {
            alias: "e",
            describe: "",
            type: "string"
        })
            .option("file", {
            alias: "f",
            describe: "Path to the file containing all collections and environments.",
            type: "string",
        }).argv;
    }
    ArgumentParser.prototype.getArgs = function () {
        return this.argv;
    };
    return ArgumentParser;
}());
exports.default = ArgumentParser;
