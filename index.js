var CompositeTokenizer = require('./lib/composite_tokenizer.js');

var fs = require('fs');
var ms = fs.readFileSync('./spec/fixtures/demo.ms', { encoding: 'UTF-8' });
var types = require('./lib/types.js');

function ExpressionFactory (src){
  var tokenizer = new CompositeTokenizer(ms);

  var current;
  var next = tokenizer.consumeNext();

  // fast forward whitespace
  while (next.type === types.WHITESPACE || next.type === types.NEW_LINE){
    next = tokenizer.consumeNext();
  }

  this.advance = function(){
    // original next is never whitespace
    current = next;

    do {
      next = tokenizer.consumeNext();
    } while (next.type === types.WHITESPACE || next.type === types.NEW_LINE);

    return current;
  };

  this.current = function() { return current; };
  this.peek = function() { return next; };
}

var expressions = new ExpressionFactory(ms);

var expression;
while((expression = expressions.advance())){

  console.log(expressions.current());
  console.log(expressions.peek());


}

