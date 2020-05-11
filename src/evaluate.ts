let operator_stack = new Array<String>();
let values_queue = new Array<String>();

interface Operation{
    name: string;
    precedence: number;
}

// check if token is number
export function isNumber(token: string): boolean{
    // returns true if NaN, otherwise false so we need to negate
    return ! isNaN(Number(token));
}

// convert token to Operator interface
function convertOperator(token: String): Operation{
    var op;
    switch(token){
        case "+":
            op = {name: '+', precedence:0};
            break;
        case "-":
            op = {name: '-', precedence:0};
            break;
        case "*":
            op = {name: '*', precedence:1};
            break;
        case "/":
            op = {name: '/', precedence:1};
            break;
        default:
            break;
    }
    return op;
}

// return the last element added to the stack
export function peek(stack: Array<String>): String{
    return stack[stack.length-1];
}

// check which operator has higher precedence
function getPrecedence(op1: Operation, op2: Operation): boolean{
    return op1.precedence > op2.precedence;
}

// extract operators and numbers from expression
function splitTokens(expression: string): Array<String>{
    const regex = new RegExp("[+/*()-]|[0123456789]+", "g");
    let matches = new Array<String>();
    let match;
    while((match = regex.exec(expression)) !== null){
      matches.push(match[0]);
    }
    return matches;
  }

// apply operators on the queue and compute intermediate results
function applyOperator(operator_stack: Array<String>, values_queue: Array<String>){
      let op = operator_stack.pop();
      let left_term = values_queue.pop();
      let right_term = values_queue.pop();
      let result = eval(`${right_term}${op}${left_term}`);
      values_queue.push(String(result));  
}

// evaluate mathematical expression based on current token
function evaluteExpression(token: string){
    if(isNumber(token)){
        values_queue.push(token);
    }
    else if(token === '(') {
        operator_stack.push(token);
    }
    else if(token === ')') {
        let top = peek(operator_stack)
        while(((top !== undefined)) && (top !== '(')){
            applyOperator(operator_stack, values_queue)
            top = peek(operator_stack); }
        operator_stack.pop(); //Discard the '('

    }
    else {
        let top = peek(operator_stack)
        let op1 = convertOperator(top)
        let op2 = convertOperator(token)
        while((op1 !== undefined) && ((top !== undefined) ) && (top !== '(') && (top !== ')') && (getPrecedence(op1, op2))){
            applyOperator(operator_stack, values_queue)
            top = peek(operator_stack)
        }
        operator_stack.push(token);
    }
}

// return the result of the mathematical expression
export function calculate(expression: string){
    let tokens = splitTokens(expression); 
    tokens.forEach(evaluteExpression);
    while(operator_stack.length !== 0){
        applyOperator(operator_stack, values_queue)
    }
    if(values_queue.includes("NaN")){
        return {'error': true, 'result': "expression is incorrect"};
    }
    return {'error': false, 'result': values_queue[0]};
}