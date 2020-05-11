"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const evaluate_1 = require("./evaluate");
const app = express_1.default();
const port = 5050;
function decodeQuery(encoded) {
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    return decoded;
}
app.get('/calculus', (request, response) => {
    const query = decodeQuery(request.query.query);
    const calculated_expression = evaluate_1.calculate(query);
    response.send(calculated_expression);
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/calculus?query=Misv`);
});
//# sourceMappingURL=server.js.map