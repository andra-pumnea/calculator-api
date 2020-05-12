"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OPERATORS = 0;
const VALUES = 1;
// check if token is number
function isNumber(token) {
    // returns true if NaN, otherwise false so we need to negate
    return !isNaN(Number(token));
}
exports.isNumber = isNumber;
// convert token to Operator interface
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
// return the last element added to the stack
function peek(stack) {
    return stack[stack.length - 1];
}
exports.peek = peek;
// check which operator has higher precedence
function getPrecedence(op1, op2) {
    return op1.precedence > op2.precedence;
}
// extract operators and numbers from expression
function splitTokens(expression) {
    const regex = new RegExp("[+/*()-]|[0123456789]+", "g");
    let matches = new Array();
    let match;
    while ((match = regex.exec(expression)) !== null) {
        matches.push(match[0]);
    }
    return matches;
}
// apply operators on the queue and compute intermediate results
function applyOperator(calculator_states) {
    let op = calculator_states[OPERATORS].pop();
    let left_term = calculator_states[VALUES].pop();
    let right_term = calculator_states[VALUES].pop();
    let result = eval(`${right_term}${op}${left_term}`);
    calculator_states[VALUES].push(String(result));
    return calculator_states;
}
// evaluate mathematical expression based on current token
function evaluteExpression(token, calculator_states) {
    if (isNumber(token)) {
        calculator_states[VALUES].push(token);
    }
    else if (token === '(') {
        calculator_states[OPERATORS].push(token);
    }
    else if (token === ')') {
        let top = peek(calculator_states[OPERATORS]);
        while (((top !== undefined)) && (top !== '(')) {
            calculator_states = applyOperator(calculator_states);
            top = peek(calculator_states[OPERATORS]);
        }
        calculator_states[OPERATORS].pop(); //Discard the '('
    }
    else {
        let top = peek(calculator_states[OPERATORS]);
        let op1 = convertOperator(top);
        let op2 = convertOperator(token);
        while ((op1 !== undefined) && ((top !== undefined)) && (top !== '(') && (top !== ')') && (getPrecedence(op1, op2))) {
            calculator_states = applyOperator(calculator_states);
            top = peek(calculator_states[OPERATORS]);
        }
        calculator_states[OPERATORS].push(token);
    }
    return calculator_states;
}
// return the result of the mathematical expression
function calculate(expression) {
    let operator_stack = new Array();
    let values_queue = new Array();
    let calculator_states = [operator_stack, values_queue];
    let tokens = splitTokens(expression);
    for (let token of tokens) {
        calculator_states = evaluteExpression(token, calculator_states);
    }
    while (operator_stack.length !== 0) {
        calculator_states = applyOperator(calculator_states);
    }
    if (values_queue.includes("NaN")) {
        return { 'error': true, 'result': "expression is incorrect" };
    }
    return { 'error': false, 'result': values_queue[0] };
}
exports.calculate = calculate;
//# sourceMappingURL=evaluate.js.map