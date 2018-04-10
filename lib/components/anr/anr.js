"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_anr_1 = require("./styled-anr");
var Anr = /** @class */ (function (_super) {
    __extends(Anr, _super);
    function Anr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Anr.prototype.render = function () {
        return (<styled_anr_1.BaseAnr />);
    };
    return Anr;
}(react_1.PureComponent));
exports.default = Anr;
//# sourceMappingURL=anr.js.map