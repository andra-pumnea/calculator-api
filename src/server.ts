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

  response.send(decodeQuery(request.query.query));
});

function decodeQuery(encoded: string): string {
  const decoded = Buffer.from(encoded, 'base64').toString('ascii')
  return decoded;
}

function splitTokens(expression: string): Array<String>{
  let rx = new RegExp("[+/*()-]|[0123456789]+", "g");
  let matches = new Array<String>();
  var match;
  while((match = rx.exec(expression)) !== null){
    matches.push(match[0]);
  }
  return matches
}

calculate('((20 - 10 ) * (30 - 20) / 10 + 10 ) * 2');
calculate("3+4*2/(1-5)")
calculate('2*(23/(33))-23*(23)');
calculate('4+5-((2+1)*3+4)/2')

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }/calculus?query=Misy` );
} );