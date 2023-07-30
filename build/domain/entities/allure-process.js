"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AllureProcess = /** @class */ (function () {
    function AllureProcess() {
    }
    AllureProcess.getAllureProcess = function () {
        if (!AllureProcess.allureProcess) {
            AllureProcess.allureProcess = { process: null };
        }
        return AllureProcess.allureProcess;
    };
    return AllureProcess;
}());
exports.default = AllureProcess;
