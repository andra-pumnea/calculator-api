import express from 'express';
import {calculate} from './evaluate';
 
const app = express();
const port = 5050;

function add(x:number, y:number): number {
  return x + y
}

function sub(x:number, y:number): number {
  return x - y
}

function mul(x:number, y:number): number {
  return x * y
}

function div(x:number, y:number): number {
  return x / y
}
 
app.get('/calculus', (request, response) => {

  const query = decodeQuery(request.query.query)
  const calculated_expression = calculate(query)
  response.send(calculated_expression[0]);
});

function decodeQuery(encoded: string): string {
  const decoded = Buffer.from(encoded, 'base64').toString('ascii')
  return decoded;
}

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }/calculus?query=MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp` );
} );