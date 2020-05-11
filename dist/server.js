"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const evaluate_1 = require("./evaluate");
const app = express_1.default();
const port = 5050;
function add(x, y) {
    return x + y;
}
function sub(x, y) {
    return x - y;
}
function mul(x, y) {
    return x * y;
}
function div(x, y) {
    return x / y;
}
app.get('/calculus', (request, response) => {
    response.send(decodeQuery(request.query.query));
});
function decodeQuery(encoded) {
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    return decoded;
}
function tryQueue() {
    let stack = new Array();
    stack.unshift('A');
    stack.unshift('B');
    stack.unshift('C');
    console.log(stack);
    console.log(stack[0]);
}
function tryStack() {
    let stack = new Array();
    stack.push('A');
    stack.push('B');
    stack.push('C');
    console.log(stack);
    console.log(stack[0]);
}
function splitTokens(expression) {
    let rx = new RegExp("[+/*()-]|[0123456789]+", "g");
    let matches = new Array();
    var match;
    while ((match = rx.exec(expression)) !== null) {
        matches.push(match[0]);
    }
    console.log(matches);
    return matches;
}
// calculate('((20 - 10 ) * (30 - 20) / 10 + 10 ) * 2');
evaluate_1.calculate("3+4*2/(1-5)");
evaluate_1.calculate('2*(23/(33))-23*(23)');
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/calculus?query=Misy`);
});
//# sourceMappingURL=server.js.map