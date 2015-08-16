var Tokenizer = require('./tokenizer.js');
var Punctuation = require('./punctuation.js');

var StringToken = require('./types.js').StringToken;

function CompositeTokenizer (src){
  'use strict';
  var tokenizer = new Tokenizer(src);

  this.consumeNext = function (){
    var next = tokenizer.consumeNext();

    return next && next.isQuoteMark() ? consumeString(next) : next;
  };

  function consumeString (startToken){
    var punc = new Punctuation();

    var holder = [ startToken ];
    punc.track(startToken);

    var next;
    while (punc.insideQuotes()){
      next = tokenizer.consumeNext();
      punc.track(next);
      holder.push(next);
    }

    return new StringToken(holder);
  }
}

module.exports = CompositeTokenizer;
