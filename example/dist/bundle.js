(function (modules) {
function require (id) {
const [fn, mapping] = modules[id]
const module = {
exports: {}
}

function localRequire(filename) {
const id =mapping[filename]
return require(id)
}

fn(localRequire, module, module.exports)

return module.exports

}
require(1)
})({

  1: [function (require, module, exports) {
    "use strict";

var _foo = require("./foo.js");

console.log('main');
(0, _foo.foo)();
      }, {"./foo.js":2} ],
        
  2: [function (require, module, exports) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("./bar.js");

var _bar2 = _interopRequireDefault(_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function foo() {
  console.log('foo');
}
      }, {"./bar.js":3} ],
        
  3: [function (require, module, exports) {
    "use strict";

var _data = require("./data.json");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('data: ', _data2.default);
      }, {"./data.json":4} ],
        
  4: [function (require, module, exports) {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "name": "Lqf"
};
      }, {} ],
        
          })