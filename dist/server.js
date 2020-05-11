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
    let query = decodeQuery(request.query.query);
    let calculated_expression = evaluate_1.calculate(query);
    response.send(calculated_expression);
});
function decodeQuery(encoded) {
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    return decoded;
}
// calculate('((20 - 10 ) * (30 - 20) / 10 + 10 ) * 2');
// calculate("3+4*2/(1-5)")
// calculate('2*(23/(33))-23*(23)');
// calculate('4+5-((2+1)*3+4)/2')
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/calculus?query=MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp`);
});
//# sourceMappingURL=server.js.map