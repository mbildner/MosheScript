var Lexer = require('./lexer.js');

var fs = require('fs');
var ms = fs.readFileSync('./spec/fixtures/demo.ms', { encoding: 'UTF-8' });

var lexer = new Lexer(ms);

var token;
while ((token = lexer.consumeNext())){
  console.log(token.toString());
}

