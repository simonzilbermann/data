"use strict";

var path = require('path');

function R(root) {
    root = root || process.cwd();
    return function (p) {
        return p[0]==">" ?
            require(path.join(root, p.substr(1, p.length-1))) :
            require(p);
    }
}

module.exports = exports = R();

exports.R = R;