var CompositeTokenizer = require('./lib/composite_tokenizer.js');

var fs = require('fs');
var ms = fs.readFileSync('./spec/fixtures/demo.ms', { encoding: 'UTF-8' });

var tokenizer = new CompositeTokenizer(ms);

var token;
while ((token = tokenizer.consumeNext())){
  console.log(token.toString());
}

