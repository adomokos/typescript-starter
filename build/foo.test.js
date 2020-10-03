"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("./foo");
it('basic', function () {
    expect(foo_1.sum()).toBe(0);
});
it('basic again', function () {
    expect(foo_1.sum(1, 2)).toBe(3);
});
