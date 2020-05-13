interface CalculatorOperation{
    name: string;
    precedence: number;
}

// check if token is number
export function isNumber(token: string): boolean{
    // returns true if NaN, otherwise false so we need to negate
    return ! isNaN(Number(token));
}

// convert token to Operator interface
function convertOperator(token: string): CalculatorOperation{
    let op: CalculatorOperation = {name: '', precedence:-1};
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
export function peek(stack: string[]): string{
    return stack[stack.length-1];
}

// check which operator has higher precedence
function getPrecedence(op1: CalculatorOperation, op2: CalculatorOperation): boolean{
    return op1.precedence > op2.precedence;
}

// extract operators and numbers from expression
function splitTokens(expression: string): string[]{
    const regex = new RegExp("[+/*()-]|[0123456789]+", "g");
    const matches: string[] = [];
    let match;
    while((match = regex.exec(expression)) !== null){
      matches.push(match[0]);
    }
    return matches;
  }

// apply operators on the queue and compute intermediate results
function applyOperator(calculatorStates: CalculatorState): CalculatorState{
      const op = calculatorStates.operatorStack.pop();
      const leftTerm = calculatorStates.valuesQueue.pop();
      const rightTerm = calculatorStates.valuesQueue.pop();
      const result = eval(`${rightTerm}${op}${leftTerm}`);
      calculatorStates.valuesQueue.push(String(result));  
      return calculatorStates;
}

function evaluateParanthesisExpression(calculatorStates: CalculatorState): CalculatorState{
    let top = peek(calculatorStates.operatorStack)
    while(((top !== undefined)) && (top !== '(')){
        calculatorStates = applyOperator(calculatorStates);
        top = peek(calculatorStates.operatorStack); 
    }
    return calculatorStates;
}

function evaluateOperatorExpression(token: string, calculatorStates: CalculatorState): CalculatorState{
    let top = peek(calculatorStates.operatorStack)
    const op1 = convertOperator(top)
    const op2 = convertOperator(token)
    while((op1 !== undefined) && ((top !== undefined) ) && (top !== '(') && (top !== ')') && (getPrecedence(op1, op2))){
        calculatorStates = applyOperator(calculatorStates);
        top = peek(calculatorStates.operatorStack)
    }
    return calculatorStates;
}

// evaluate mathematical expression based on current token
function evaluteExpression(token: string, calculatorStates: CalculatorState): CalculatorState{
    if(isNumber(token)){
        calculatorStates.valuesQueue.push(token);
    }
    else if(token === '(') {
        calculatorStates.operatorStack.push(token);
    }
    else if(token === ')') {
        calculatorStates = evaluateParanthesisExpression(calculatorStates);
        calculatorStates.operatorStack.pop(); //Discard the '('
    }
    else {
        calculatorStates = evaluateOperatorExpression(token, calculatorStates);
        calculatorStates.operatorStack.push(token);
    }
    return calculatorStates;
}

interface CalculatorState {
    operatorStack: string[];
    valuesQueue: string[];
}

// return the result of the mathematical expression
export function calculate(expression: string): CalculatorResult{
    let calculatorStates: CalculatorState = {operatorStack:[], valuesQueue:[]}
    const tokens = splitTokens(expression); 
    for (const token of tokens){
        calculatorStates = evaluteExpression(token, calculatorStates);
    }
    while(calculatorStates.operatorStack.length !== 0){
        calculatorStates = applyOperator(calculatorStates);
    }
    return calculatorStates.valuesQueue[0];
}