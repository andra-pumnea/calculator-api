"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_1 = require("../evaluate");
const evaluate_2 = require("../evaluate");
test('should return a string which is the latest item added to the stack', () => {
    let stack = new Array();
    stack.push('A');
    stack.push('B');
    stack.push('C');
    expect(evaluate_1.peek(stack)).toEqual('C');
});
test('should return True is string is numeric, false otherwise', () => {
    expect(evaluate_2.isNumber('(')).toBe(false);
    expect(evaluate_2.isNumber('2+2')).toBe(false);
    expect(evaluate_2.isNumber('1')).toBe(true);
    expect(evaluate_2.isNumber('1234')).toBe(true);
});
//# sourceMappingURL=server.test.js.map