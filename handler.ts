import { Handler, Context, Callback } from 'aws-lambda';
import {calculate} from './src/evaluate';

interface CalculatorResult {
  error: boolean;
  result: string;
}

// decode query from base64 to ascii
function decodeQuery(encoded: string): string {
  const decoded = Buffer.from(encoded, 'base64').toString('ascii')
  return decoded;
}

function checkIfQueryExists(event: any): boolean{
  return event.queryStringParameters !== null;
}

function getResponse(calculatedExpression: string): CalculatorResult {
  if(calculatedExpression !== "NaN"){
    return {error: false, result: calculatedExpression} 
  } 
  else {
      return {error: true, result: "expression is incorrect"}
  }
}

const calculator: Handler = (event: any, context: Context, callback: Callback) => {
  if(checkIfQueryExists(event)){
    const query = decodeQuery(event.queryStringParameters.query)
    const calculatedExpression = calculate(query)
    const response = getResponse(calculatedExpression);
    callback(undefined, {statusCode: 200, body: JSON.stringify(response)} );
  }
};

export { calculator }