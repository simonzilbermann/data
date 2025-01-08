"use strict";

var t = require('chai').assert;

describe('r', function () {

    it('require with default r', function () {
        var r = require('../');
        var a = r('>/test/fixtures/a');
        t.equal('hello', a.value);
    });

    it('require with custom r', function () {
        var r = require('../').R(__dirname);
        var a = r('>/fixtures/a');
        t.equal('hello', a.value);
    });
});