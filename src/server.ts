import express from 'express';
import {calculate} from './evaluate';
 
const app = express();
const port = 5050;

function decodeQuery(encoded: string): string {
  const decoded = Buffer.from(encoded, 'base64').toString('ascii')
  return decoded;
}
 
app.get('/calculus', (request, response) => {

  const query = decodeQuery(request.query.query)
  const calculated_expression = calculate(query)
  response.send(calculated_expression);
});


app.listen( port, () => {
  // console.log( `server started at http://localhost:${ port }/calculus?query=Misv` );
  console.log( `server started at http://localhost:${ port }/calculus?query=MiAqICgyMy8oMzMpKS0gMjMgKiAoMjMp` );
} );