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
function applyOperator(calculatorStates: any[]){
      let op = calculatorStates[OPERATORS].pop();
      let leftTerm = calculatorStates[VALUES].pop();
      let rightTerm = calculatorStates[VALUES].pop();
      let result = eval(`${rightTerm}${op}${leftTerm}`);
      calculatorStates[VALUES].push(String(result));  
      return calculatorStates;
}

function evaluateParanthesisExpression(calculatorStates: any[]){
    let top = peek(calculatorStates[OPERATORS])
    while(((top !== undefined)) && (top !== '(')){
        calculatorStates = applyOperator(calculatorStates);
        top = peek(calculatorStates[OPERATORS]); 
    }
    return calculatorStates;
}

function evaluateOperatorExpression(token: String, calculatorStates: any[]){
    let top = peek(calculatorStates[OPERATORS])
    let op1 = convertOperator(top)
    let op2 = convertOperator(token)
    while((op1 !== undefined) && ((top !== undefined) ) && (top !== '(') && (top !== ')') && (getPrecedence(op1, op2))){
        calculatorStates = applyOperator(calculatorStates);
        top = peek(calculatorStates[OPERATORS])
    }
    return calculatorStates;
}

// evaluate mathematical expression based on current token
function evaluteExpression(token: String, calculatorStates: any[]){
    if(isNumber(token)){
        calculatorStates[VALUES].push(token);
    }
    else if(token === '(') {
        calculatorStates[OPERATORS].push(token);
    }
    else if(token === ')') {
        calculatorStates = evaluateParanthesisExpression(calculatorStates);
        calculatorStates[OPERATORS].pop(); //Discard the '('
    }
    else {
        calculatorStates = evaluateOperatorExpression(token, calculatorStates);
        calculatorStates[OPERATORS].push(token);
    }
    return calculatorStates;
}

// return the result of the mathematical expression
export function calculate(expression: string){
    let operatorStack: String[] = [];
    let valuesQueue: String[] = [];
    let calculatorStates = [operatorStack, valuesQueue]
    let tokens = splitTokens(expression); 
    for (let token of tokens){
        calculatorStates = evaluteExpression(token, calculatorStates);
    }
    while(operatorStack.length !== 0){
        calculatorStates = applyOperator(calculatorStates);
    }
    if(valuesQueue.includes("NaN")){
        return {'error': true, 'result': "expression is incorrect"};
    }
    return {'error': false, 'result': valuesQueue[0]};
}