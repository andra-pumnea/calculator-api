import express from 'express';
import {calculate} from './evaluate';
 
const app = express();
const port = 5050;

// decode query from base64 to ascii
function decodeQuery(encoded: string): string {
  const decoded = Buffer.from(encoded, 'base64').toString('ascii')
  return decoded;
}

// display the result of the mathematical expression or error
app.get('/calculus', (request, response) => {

  const query = decodeQuery(request.query.query as string)
  const calculatedExpression = calculate(query)
  response.send(JSON.stringify(calculatedExpression));
});

// start server
app.listen( port, () => {
  // console.log( `server started at http://localhost:${ port }/calculus?query=Misv`);
  console.log( `server started at http://localhost:${ port }/calculus?query=MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp`);
} );