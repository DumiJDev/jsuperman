#!/usr/bin/env node
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
var chalk_1 = __importDefault(require("chalk"));
var node_cron_1 = require("node-cron");
var jallure_service_impl_1 = __importDefault(require("./adapters/inbound/jallure-service-impl"));
var jfont_service_impl_1 = __importDefault(require("./adapters/inbound/jfont-service-impl"));
var jsuperman_service_impl_1 = __importDefault(require("./adapters/inbound/jsuperman-service-impl"));
var jemail_service_impl_1 = __importDefault(require("./adapters/outbound/jemail-service-impl"));
var jreport_service_impl_1 = __importDefault(require("./adapters/outbound/jreport-service-impl"));
var args_1 = __importDefault(require("./configs/args"));
var jsuperman_config_1 = __importDefault(require("./configs/jsuperman-config"));
var version_1 = __importDefault(require("./configs/version"));
var jemail_model_1 = __importDefault(require("./domain/entities/jemail-model"));
var JSupermanApp = /** @class */ (function () {
    function JSupermanApp(title, args, jSupermanService, jConfigs, jFontService, jAllureService) {
        this.title = title;
        this.args = args;
        this.jSupermanService = jSupermanService;
        this.jConfigs = jConfigs;
        this.jFontService = jFontService;
        this.jAllureService = jAllureService;
    }
    JSupermanApp.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cron;
            var _this = this;
            return __generator(this, function (_a) {
                console.log(chalk_1.default.blue(this.jFontService.design(this.title)));
                console.log(chalk_1.default.bgBlue.white('\t\t\t\t\t\t[' + version_1.default + ']'), "\n\n");
                cron = this.args.getArgs().cron;
                try {
                    if (cron) {
                        console.log("Scheduled:", chalk_1.default.blue(cron));
                        (0, node_cron_1.schedule)((0, node_cron_1.validate)(cron.replace('"', ""))
                            ? cron.replace('"', "")
                            : "0 0 */2 * * *", function () {
                            _this.execute();
                        });
                    }
                    else {
                        this.execute();
                    }
                }
                catch (error) {
                    console.log("Occurred unexpected error:", chalk_1.default.red(error.message));
                    process.exit(0);
                }
                return [2 /*return*/];
            });
        });
    };
    JSupermanApp.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, executions, emailConfig, emailService, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.jConfigs.buildConfig(this.args.getArgs())];
                    case 1:
                        config = _a.sent();
                        this.jAllureService.stopsAllureServer();
                        return [4 /*yield*/, this.jSupermanService.run(config, this.args.getArgs())];
                    case 2:
                        executions = _a.sent();
                        emailConfig = this.args.getArgs()["email-config"];
                        if (!emailConfig) return [3 /*break*/, 4];
                        emailService = jemail_service_impl_1.default.getInstance(emailConfig);
                        return [4 /*yield*/, emailService.sendMail(jemail_model_1.default.fromConfig(emailConfig, executions))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        console.log("Processed:", chalk_1.default.blue(executions.length));
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log("Occurred unexpected error:", chalk_1.default.red(error_1.message));
                        process.exit(0);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return JSupermanApp;
}());
var title = "JSuperman";
var allureService = new jallure_service_impl_1.default();
var args = new args_1.default();
var app = new JSupermanApp(title, args, new jsuperman_service_impl_1.default(new jreport_service_impl_1.default(), allureService), new jsuperman_config_1.default(), new jfont_service_impl_1.default(), allureService);
app.run();
