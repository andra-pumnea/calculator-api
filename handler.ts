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

const calculator: Handler = (event: any, context: Context, callback: Callback) => {
  const query = decodeQuery("MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp")
  const calculatedExpression = calculate(query)
  console.log(calculatedExpression)
  let response: CalculatorResult;
  if(calculatedExpression !== "NaN"){
    response = {
      error: false,
      result: JSON.stringify(calculatedExpression)
  } }
  else {
      response = {
        error: true,
        result: JSON.stringify("expression is incorrect")
      }
  }
  console.log(response)
  callback(undefined, response);
};

export { calculator }