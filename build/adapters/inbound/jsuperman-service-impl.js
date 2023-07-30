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
var fs_extra_1 = require("fs-extra");
var newman_1 = __importDefault(require("newman"));
var JSupermanServiceImpl = /** @class */ (function () {
    function JSupermanServiceImpl(jReportService, jAllureService, jMailService) {
        this.jReportService = jReportService;
        this.jAllureService = jAllureService;
        this.jMailService = jMailService;
    }
    JSupermanServiceImpl.prototype.run = function (list, options) {
        return __awaiter(this, void 0, void 0, function () {
            var results, _i, list_1, item, executions, executions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        if ((0, fs_extra_1.pathExistsSync)("allure-results"))
                            (0, fs_extra_1.removeSync)("allure-results");
                        _i = 0, list_1 = list;
                        _a.label = 1;
                    case 1:
                        if (!(_i < list_1.length)) return [3 /*break*/, 8];
                        item = list_1[_i];
                        if (!item.collection) return [3 /*break*/, 6];
                        if (!item.environment) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.runWithEnv(item.collection, item.environment, options)];
                    case 2:
                        executions = _a.sent();
                        results.push.apply(results, executions);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.runWithoutEnv(item.collection, options)];
                    case 4:
                        executions = _a.sent();
                        results.push.apply(results, executions);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        console.log("Collection not found");
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8:
                        if (options.export)
                            (0, fs_extra_1.writeFileSync)("./results.json", JSON.stringify(results, null, 2));
                        if (options.serve === "allure")
                            this.jAllureService.startsAllureServer(options);
                        if (!options.report) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.jReportService.report({
                                executions: results,
                                url: options.report,
                            })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (options.email) {
                            this.jMailService.sendMail();
                        }
                        return [2 /*return*/, Promise.resolve(results.length)];
                }
            });
        });
    };
    JSupermanServiceImpl.prototype.runNewman = function (newmanOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        newman_1.default.run(newmanOptions, function (error, summary) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(summary.run.executions);
                            }
                        });
                    })];
            });
        });
    };
    JSupermanServiceImpl.prototype.runWithEnv = function (collection, environment, options) {
        return __awaiter(this, void 0, void 0, function () {
            var newmanOptions;
            return __generator(this, function (_a) {
                newmanOptions = {
                    collection: collection,
                    environment: environment,
                    reporters: ["cli", "allure"],
                    globals: options === null || options === void 0 ? void 0 : options.globals,
                    iterationCount: (options === null || options === void 0 ? void 0 : options.iteration) ? options.iteration : 1,
                };
                return [2 /*return*/, this.runNewman(newmanOptions)];
            });
        });
    };
    JSupermanServiceImpl.prototype.runWithoutEnv = function (collection, options) {
        return __awaiter(this, void 0, void 0, function () {
            var newmanOptions;
            return __generator(this, function (_a) {
                newmanOptions = {
                    collection: collection,
                    reporters: ["cli", "allure"],
                    globals: options === null || options === void 0 ? void 0 : options.globals,
                    iterationCount: (options === null || options === void 0 ? void 0 : options.iteration) ? options.iteration : 1,
                };
                return [2 /*return*/, this.runNewman(newmanOptions)];
            });
        });
    };
    return JSupermanServiceImpl;
}());
exports.default = JSupermanServiceImpl;
