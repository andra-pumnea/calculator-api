"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let operator_stack = new Array();
let values_queue = new Array();
function isNumber(token) {
    // returns true if NaN, otherwise false so we need to negate
    return !isNaN(Number(token));
}
exports.isNumber = isNumber;
function convertOperator(token) {
    var op;
    switch (token) {
        case "+":
            op = { name: '+', precedence: 0 };
            break;
        case "-":
            op = { name: '-', precedence: 0 };
            break;
        case "*":
            op = { name: '*', precedence: 1 };
            break;
        case "/":
            op = { name: '/', precedence: 1 };
            break;
        default:
            break;
    }
    return op;
}
function peek(stack) {
    return stack[stack.length - 1];
}
exports.peek = peek;
function getPrecedence(op1, op2) {
    return op1.precedence > op2.precedence;
}
function splitTokens(expression) {
    const regex = new RegExp("[+/*()-]|[0123456789]+", "g");
    let matches = new Array();
    let match;
    while ((match = regex.exec(expression)) !== null) {
        matches.push(match[0]);
    }
    return matches;
}
function applyOperator(operator_stack, values_queue) {
    let op = operator_stack.pop();
    let right_term = values_queue.pop();
    let left_term = values_queue.pop();
    let result = eval(`${right_term}${op}${left_term}`);
    values_queue.push(String(result));
}
function evaluteExpression(token) {
    console.log(token);
    if (isNumber(token)) {
        values_queue.push(token);
    }
    else if (token === '(') {
        operator_stack.push(token);
    }
    else if (token === ')') {
        let top = peek(operator_stack);
        while (((top !== undefined)) && (top !== '(')) {
            applyOperator(operator_stack, values_queue);
            top = peek(operator_stack);
        }
        operator_stack.pop(); //Discard the '('
    }
    else {
        let top = peek(operator_stack);
        let op1 = convertOperator(top);
        let op2 = convertOperator(token);
        while ((op1 !== undefined) && ((top !== undefined)) && (top !== '(') && (top !== ')') && (getPrecedence(op1, op2))) {
            applyOperator(operator_stack, values_queue);
            top = peek(operator_stack);
        }
        operator_stack.push(token);
    }
}
function calculate(expression) {
    let tokens = splitTokens(expression);
    tokens.forEach(evaluteExpression);
    while (operator_stack.length !== 0) {
        applyOperator(operator_stack, values_queue);
    }
    console.log(values_queue);
}
exports.calculate = calculate;
//# sourceMappingURL=evaluate.js.map