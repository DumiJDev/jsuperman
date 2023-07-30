"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var allure_commandline_1 = __importDefault(require("allure-commandline"));
var allure_process_1 = __importDefault(require("../../domain/entities/allure-process"));
var tree_kill_1 = __importDefault(require("tree-kill"));
var JAllureServerServiceImpl = /** @class */ (function () {
    function JAllureServerServiceImpl() {
    }
    JAllureServerServiceImpl.prototype.startsAllureServer = function (_a) {
        var quiet = _a.quiet, port = _a.port;
        var commands = [];
        if (quiet)
            commands.push("-q");
        commands.push.apply(commands, ["serve", "allure-results", "-p", port ? port : "1999"]);
        allure_process_1.default.getAllureProcess().process = (0, allure_commandline_1.default)(commands);
    };
    JAllureServerServiceImpl.prototype.stopsAllureServer = function () {
        var _a, _b;
        if (allure_process_1.default.getAllureProcess().process) {
            if ((_a = allure_process_1.default.getAllureProcess().process) === null || _a === void 0 ? void 0 : _a.pid) {
                (0, tree_kill_1.default)((_b = allure_process_1.default.getAllureProcess().process) === null || _b === void 0 ? void 0 : _b.pid, "SIGINT");
                allure_process_1.default.getAllureProcess().process = null;
            }
        }
    };
    return JAllureServerServiceImpl;
}());
exports.default = JAllureServerServiceImpl;
