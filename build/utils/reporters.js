"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var newman_reporter_htmlextra_1 = __importDefault(require("newman-reporter-htmlextra"));
var allure_commandline_1 = __importDefault(require("allure-commandline"));
var _1 = require("./");
function generateAllureReport(port) {
    return __awaiter(this, void 0, void 0, function () {
        var reportPath, generation;
        return __generator(this, function (_a) {
            reportPath = "./allure-report";
            generation = (0, allure_commandline_1.default)([
                "generate",
                "./newman-report",
                "--output",
                reportPath,
            ]);
            console.log(generation);
            generation.on("exit", function (exitCode) {
                console.log("Generation is finished with code:", exitCode);
            });
            console.log("Relatório do Allure gerado em:", reportPath);
            return [2 /*return*/];
        });
    });
}
function generateHtmlExtraReport() {
    return __awaiter(this, void 0, void 0, function () {
        var reportPath, options;
        return __generator(this, function (_a) {
            reportPath = "./htmlextra-report";
            options = {
                reportTitle: "Relatório do Newman",
                outputPath: reportPath,
            };
            newman_reporter_htmlextra_1.default.process("./newman-report.json", options);
            console.log("Relatório HTML Extra gerado em:", reportPath);
            return [2 /*return*/];
        });
    });
}
function runNewmanWithReporters(list, options) {
    return __awaiter(this, void 0, void 0, function () {
        var results, _i, list_1, item, executions, executions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    _i = 0, list_1 = list;
                    _a.label = 1;
                case 1:
                    if (!(_i < list_1.length)) return [3 /*break*/, 6];
                    item = list_1[_i];
                    if (!item.environment) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, _1.runNewmanWithEnvironment)(item.collection, item.environment, options)];
                case 2:
                    executions = _a.sent();
                    results.push.apply(results, executions);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0, _1.runNewman)(item.collection, options)];
                case 4:
                    executions = _a.sent();
                    results.push.apply(results, executions);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    fs_1.default.writeFileSync("./newman-report.json", JSON.stringify(results, null, 2));
                    return [4 /*yield*/, generateAllureReport(options === null || options === void 0 ? void 0 : options.port)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, generateHtmlExtraReport()];
                case 8:
                    _a.sent();
                    return [2 /*return*/, Promise.resolve(results.length)];
            }
        });
    });
}
exports.default = runNewmanWithReporters;
