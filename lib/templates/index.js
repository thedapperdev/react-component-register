"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var utils_1 = require("./../utils");
exports.indexFile = function (name) {
    return "export { default as " + utils_1.pascalCase(name) + " } from './" + fp_1.kebabCase(name) + "'";
};
exports.componentFile = function (name) {
    return "import React, { PureComponent } from 'react'\nimport { Base" + utils_1.pascalCase(name) + " } from './styled-" + fp_1.kebabCase(name) + "'\n\ninterface Props {\n\n}\n\nexport default class " + utils_1.pascalCase(name) + " extends PureComponent<Props> {\n  render() {\n    return (<Base" + utils_1.pascalCase(name) + " />)\n  }\n}";
};
exports.styledComponentFile = function (name) {
    return "import styled, { StyledFunction, css } from 'styled-components'\n\nexport const Base" + utils_1.pascalCase(name) + " = styled.div`\n  content: \"styling\"\n`";
};
//# sourceMappingURL=index.js.map