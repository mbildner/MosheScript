var CompositeTokenizer = require('./lib/composite_tokenizer.js');

var fs = require('fs');
var ms = fs.readFileSync('./spec/fixtures/demo.ms', { encoding: 'UTF-8' });

function ExpressionFactory (src){
  var tokenizer = new CompositeTokenizer(ms);

  this.consumeNext = function(){
    var token = tokenizer.consumeNext();
    if (!token) { return false; }

    return token;
  };

}

var expressions = new ExpressionFactory(ms);

var expression;
while((expression = expressions.consumeNext())){
  // console.log(expression);
  console.log(expression.toString());
}

