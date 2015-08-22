var Tokenizer = require('./tokenizer.js');
var Punctuation = require('./punctuation.js');
var types = require('./types.js');
var Token = require('./token.js');

function CompositeTokenizer (src){
  'use strict';
  var tokenizer = new Tokenizer(src);

  var previousToken = null;

  this.consumeNext = function (){
    var next, compToken;

    // throw away non-significant whitespace
    do {
      next = tokenizer.consumeNext();
    } while(next.type === types.WHITESPACE);

    if (!next) {
      compToken = false;
    }
    else if (next.type === types.SINGLE_QUOTE || next.type === types.DOUBLE_QUOTE) {
      compToken = consumeString(next);
    }
    else if (next.type === types.RUNE) {
      compToken = consumeRune(next);
    }
    else {
      compToken = next;
    }

    previousToken = compToken;

    return compToken;
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

    return Token.for(holder, types.STRING);

  }

  function consumeRune (token){
    return token;
  }
}

module.exports = CompositeTokenizer;
