"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var pascalCase = function (input) {
    var capitalised = fp_1.capitalize(input);
    var firstChar = fp_1.head(capitalised);
    return firstChar && fp_1.isString(firstChar)
        ? "" + firstChar + fp_1.camelCase(fp_1.tail(capitalised).join(''))
        : capitalised;
};
exports.default = pascalCase;
//# sourceMappingURL=pascalCase.js.map