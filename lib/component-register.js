"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var Path = require("path");
var lodash_1 = require("lodash");
var templates_1 = require("./templates");
var ComponentRegister = /** @class */ (function () {
    function ComponentRegister(componentRootPath) {
        this.path = componentRootPath;
        this.components = [];
        this.registerAll();
        this.writeIndex();
    }
    ComponentRegister.prototype.writeIndex = function () {
        var _this = this;
        this.writeFile(Path.join(this.path, 'index.ts'), function (stream) {
            _this.components.sort().forEach(function (component) {
                stream.write("export * from './" + component + "'\r\n");
            });
        });
    };
    ComponentRegister.prototype.isFolder = function (folderPath) {
        var isDir = false;
        try {
            isDir = Fs.statSync(folderPath)
                .isDirectory();
        }
        catch (err) {
            //  ignore errs
        }
        return isDir;
    };
    ComponentRegister.prototype.getFilesList = function (path) {
        if (path === void 0) { path = this.path; }
        var contents = [];
        try {
            contents = Fs.readdirSync(path);
        }
        catch (err) {
            console.log("cannot run component register.. " + err);
        }
        return contents;
    };
    ComponentRegister.prototype.hasIndexFile = function (componentPath) {
        return Fs.existsSync(Path.join(componentPath, 'index.ts')) ||
            Fs.existsSync(Path.join(componentPath, 'index.tsx'));
    };
    ComponentRegister.prototype.isValidComponent = function (path) {
        return this.isFolder(path) && this.hasIndexFile(path);
    };
    ComponentRegister.prototype.registerSingle = function (folderPath) {
        var entirePath = Path.join(this.path, folderPath);
        if (this.isValidComponent(entirePath)) {
            this.components.push(folderPath);
        }
    };
    ComponentRegister.prototype.registerAll = function () {
        for (var _i = 0, _a = this.getFilesList(); _i < _a.length; _i++) {
            var file = _a[_i];
            this.registerSingle(file);
        }
        return this.components;
    };
    ComponentRegister.prototype.writeFile = function (path, processStream) {
        var stream = Fs.createWriteStream(path);
        stream.once('open', function () {
            processStream(stream);
        });
    };
    ComponentRegister.prototype.createComponent = function (name) {
        if (name) {
            var componentPath = Path.join(this.path, name);
            if (!Fs.existsSync(componentPath)) {
                Fs.mkdirSync(componentPath);
                // write index
                this.writeFile(Path.join(componentPath, 'index.ts'), function (stream) {
                    stream.write(templates_1.indexFile(name));
                });
                //  write tsx
                this.writeFile(Path.join(componentPath, lodash_1.kebabCase(name) + ".tsx"), function (stream) {
                    stream.write(templates_1.componentFile(name));
                });
                //  write styled-component
                this.writeFile(Path.join(componentPath, "styled-" + lodash_1.kebabCase(name) + ".ts"), function (stream) {
                    stream.write(templates_1.styledComponentFile(name));
                });
            }
            this.writeIndex();
        }
    };
    return ComponentRegister;
}());
exports.default = ComponentRegister;
//# sourceMappingURL=component-register.js.map