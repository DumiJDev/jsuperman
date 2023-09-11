"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var entities_1 = require("../../domain/entities");
var RestServiceImpl = /** @class */ (function () {
    function RestServiceImpl() {
    }
    RestServiceImpl.prototype.getResults = function (_a) {
        var page = _a.page, size = _a.size;
        try {
            var fileStr = (0, fs_extra_1.readFileSync)(entities_1.OutputResult.Path, { encoding: "utf8" });
            if (page && !page.toString().match(/[0-9]*/g))
                throw new Error("Ops! Invalid number format...");
            return this.formatResponse(fileStr ? JSON.parse(fileStr) : [], {
                page: page,
                size: size,
            });
        }
        catch (error) {
            return [];
        }
    };
    RestServiceImpl.prototype.formatResponse = function (results, _a) {
        var page = _a.page, size = _a.size;
        var currentPage = page ? Number(page) : 1;
        var currentSize = size ? Number(size) : 5;
        var nextPage = currentPage + 1;
        var o = {};
        var pages = results.length > 0
            ? parseInt("".concat(results.length / currentSize)) +
                (results.length % currentSize === 0 ? 0 : 1)
            : 0;
        if (nextPage < results.length % 5) {
            o.nextPage = nextPage;
        }
        if (currentPage > 1) {
            o.previousPage = currentPage - 1;
        }
        return __assign({ pages: pages, items: results.length, size: currentSize, page: currentPage, content: results.slice(currentSize * (currentPage - 1), currentSize * currentPage) }, o);
    };
    return RestServiceImpl;
}());
exports.default = RestServiceImpl;
