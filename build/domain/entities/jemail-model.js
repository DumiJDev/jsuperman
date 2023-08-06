"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ejs_1 = __importDefault(require("ejs"));
var fs_extra_1 = require("fs-extra");
var _1 = require(".");
var JEmailModel = /** @class */ (function () {
    function JEmailModel(to, subject, message) {
        if (message.messageType === _1.MessageType.HTML)
            this.htmlMessage = message.content;
        else if (message.messageType === _1.MessageType.TEXT)
            this.simpleMessage = message.content;
        this.to = to.map(function (_a) {
            var email = _a.email;
            return email;
        }).join(",");
        this.subject = subject || "Test at ".concat(new Date());
    }
    JEmailModel.fromConfig = function (emailConfig, data) {
        var to = emailConfig.to.map(function (email) { return ({ email: email }); });
        var message;
        if (emailConfig.content)
            message = { messageType: _1.MessageType.TEXT, content: emailConfig.content };
        else if (emailConfig.template) {
            var content = ejs_1.default.render((0, fs_extra_1.readFileSync)(emailConfig.template, { encoding: "utf8" }), data);
            message = { messageType: _1.MessageType.HTML, content: content };
        }
        else
            message = { messageType: _1.MessageType.TEXT, content: "JSuperman reports" };
        return new JEmailModel(to, emailConfig.subject || "JSuperman reports", message);
    };
    return JEmailModel;
}());
exports.default = JEmailModel;
