var Tokenizer = require('./tokenizer.js');
var Punctuation = require('./punctuation.js');
var types = require('./types.js');
var keywords = require('./keywords.js');
var StringToken = require('./types.js').StringToken;
var FuncToken = require('./types.js').FuncToken;
var NameToken = require('./types.js').NameToken;

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
    else if (next.isQuoteMark()) {
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

    return new StringToken(holder);
  }

  function consumeRune (token){
    if (previousToken && previousToken.raw === keywords.FUNC) {
      return new NameToken(token);
    }
    if (token.raw !== keywords.FUNC) { return token; }

    return new FuncToken(token);
  }
}

module.exports = CompositeTokenizer;
