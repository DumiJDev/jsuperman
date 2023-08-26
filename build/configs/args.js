"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var yargs_1 = __importDefault(require("yargs"));
var ArgumentParser = /** @class */ (function () {
    function ArgumentParser() {
        this.argv = yargs_1.default
            .option("globals", {
            alias: "g",
            describe: "Set global variables for the test execution.",
            type: "string",
        })
            .option("port", {
            alias: "p",
            describe: "Specify the port for accessing the generated report.",
            type: "string",
        })
            .option("iteration", {
            alias: "i",
            describe: "Number of test execution iterations (default is 1).",
            type: "number",
            default: 1,
        })
            .option("url", {
            alias: "u",
            describe: "URL to access test collections and environments.",
            type: "string",
        })
            .option("serve", {
            alias: "s",
            describe: "Run a server after generating the report for easy access.",
            type: "string",
            coerce: function (arg) {
                return arg === "" ? "allure" : arg;
            },
        })
            .option("native", {
            alias: "n",
            describe: "Use the native reporter to generate the report.",
            type: "boolean",
            default: false,
        })
            .option("report", {
            alias: "rp",
            describe: "URL to send the report results after test execution.",
            type: "string",
        })
            .option("export", {
            alias: "e",
            describe: "Export test results to a JSON file at the specified path.",
            type: "boolean",
            default: false
        })
            .option("quiet", {
            alias: "q",
            describe: "Run the server in quiet mode to minimize log output.",
            type: "boolean",
            default: false,
        })
            .option("cron", {
            alias: "c",
            describe: "Schedule jsuperman to run using a cron expression.",
            type: "string",
        })
            .option("email-config", {
            alias: "ec",
            describe: "SMTP configuration in key:value format separated by semicolons.",
            type: "string",
            coerce: function (arg) {
                if (!arg) {
                    return null;
                }
                return JSON.parse((0, fs_extra_1.readFileSync)(arg.endsWith(".json") ? arg : arg + ".json", {
                    encoding: "utf8",
                }));
            },
        })
            .option("rest", {
            alias: "r",
            describe: "Enable REST endpoint to get results",
            type: "boolean",
            default: false,
        })
            .option("file", {
            alias: "f",
            describe: "Path to a file containing collections and environments.",
            type: "string",
        }).argv;
    }
    ArgumentParser.prototype.getArgs = function () {
        return this.argv;
    };
    return ArgumentParser;
}());
exports.default = ArgumentParser;
