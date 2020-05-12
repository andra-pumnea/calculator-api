const OPERATORS = 0;
const VALUES = 1;


interface Operation{
    name: string;
    precedence: number;
}

// check if token is number
export function isNumber(token: String): boolean{
    // returns true if NaN, otherwise false so we need to negate
    return ! isNaN(Number(token));
}

// convert token to Operator interface
function convertOperator(token: String): Operation{
    let op : Operation = {name: '', precedence:-1};
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
function applyOperator(calculator_states: any[]){
      let op = calculator_states[OPERATORS].pop();
      let left_term = calculator_states[VALUES].pop();
      let right_term = calculator_states[VALUES].pop();
      let result = eval(`${right_term}${op}${left_term}`);
      calculator_states[VALUES].push(String(result));  
      return calculator_states;
}

function evaluateParanthesisExpression(calculator_states: any[]){
    let top = peek(calculator_states[OPERATORS])
    while(((top !== undefined)) && (top !== '(')){
        calculator_states = applyOperator(calculator_states);
        top = peek(calculator_states[OPERATORS]); 
    }
    return calculator_states;
}

function evaluateOperatorExpression(token: String, calculator_states: any[]){
    let top = peek(calculator_states[OPERATORS])
    let op1 = convertOperator(top)
    let op2 = convertOperator(token)
    while((op1 !== undefined) && ((top !== undefined) ) && (top !== '(') && (top !== ')') && (getPrecedence(op1, op2))){
        calculator_states = applyOperator(calculator_states);
        top = peek(calculator_states[OPERATORS])
    }
    return calculator_states;
}

// evaluate mathematical expression based on current token
function evaluteExpression(token: String, calculator_states: any[]){
    if(isNumber(token)){
        calculator_states[VALUES].push(token);
    }
    else if(token === '(') {
        calculator_states[OPERATORS].push(token);
    }
    else if(token === ')') {
        calculator_states = evaluateParanthesisExpression(calculator_states);
        calculator_states[OPERATORS].pop(); //Discard the '('
    }
    else {
        calculator_states = evaluateOperatorExpression(token, calculator_states);
        calculator_states[OPERATORS].push(token);
    }
    return calculator_states;
}

// return the result of the mathematical expression
export function calculate(expression: string){
    let operator_stack: String[] = [];
    let values_queue: String[] = [];
    let calculator_states = [operator_stack, values_queue]
    let tokens = splitTokens(expression); 
    for (let token of tokens){
        calculator_states = evaluteExpression(token, calculator_states);
    }
    while(operator_stack.length !== 0){
        calculator_states = applyOperator(calculator_states);
    }
    if(values_queue.includes("NaN")){
        return {'error': true, 'result': "expression is incorrect"};
    }
    return {'error': false, 'result': values_queue[0]};
}