"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var figlet_1 = require("figlet");
var JFontServiceImpl = /** @class */ (function () {
    function JFontServiceImpl(font) {
        this.font = font;
    }
    JFontServiceImpl.prototype.design = function (text) {
        return (0, figlet_1.textSync)(text, { font: this.font ? this.font : "Doom" });
    };
    return JFontServiceImpl;
}());
exports.default = JFontServiceImpl;
