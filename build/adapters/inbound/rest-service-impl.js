"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var entities_1 = require("../../domain/entities");
var RestServiceImpl = /** @class */ (function () {
    function RestServiceImpl() {
    }
    RestServiceImpl.prototype.getResults = function () {
        try {
            var fileStr = (0, fs_extra_1.readFileSync)(entities_1.OutputResult.Path, { encoding: "utf8" });
            return fileStr ? JSON.parse(fileStr) : [];
        }
        catch (error) {
            return [];
        }
    };
    return RestServiceImpl;
}());
exports.default = RestServiceImpl;
