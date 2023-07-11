"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beautify = void 0;
var figlet_1 = __importDefault(require("figlet"));
var beautify = function (text) {
    return figlet_1.default.textSync(text, { font: "Doom" });
};
exports.beautify = beautify;
