"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var version = "1.0.8";
if ((0, fs_1.existsSync)("../../package.json")) {
    var packageString = (0, fs_1.readFileSync)("../../package.json", {
        encoding: "utf8",
    });
    var packageJson = JSON.parse(packageString);
    version = packageJson.version;
}
exports.default = version;
