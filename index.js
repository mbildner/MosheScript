var CompositeTokenizer = require('./lib/composite_tokenizer.js');

var fs = require('fs');
var ms = fs.readFileSync('./spec/fixtures/demo.ms', { encoding: 'UTF-8' });
var types = require('./lib/types.js');

function WhiteSpaceStripper (src){
  var tokenizer = new CompositeTokenizer(ms);

  this.consumeNext = function(){
    var next = tokenizer.consumeNext();

    if (!next) { return false; }

    while (next.type === types.WHITESPACE || next.type === types.NEW_LINE) {
      return this.consumeNext();
    }

    return next;
  };
}

var tokenizer = new WhiteSpaceStripper(ms);

var a;
while ((a = tokenizer.consumeNext())){
  console.log(a);
}

