var Tokenizer = require('./tokenizer.js');
var Punctuation = require('./punctuation.js');
var types = require('./types.js');
var keywords = require('./keywords.js');
var StringToken = require('./types.js').StringToken;
var FuncToken = require('./types.js').FuncToken;

function CompositeTokenizer (src){
  'use strict';
  var tokenizer = new Tokenizer(src);

  var previousToken = null;

  this.consumeNext = function (){
    var next, compToken;

    next = tokenizer.consumeNext();

    // pipe exhausted, finish
    if (!next) { return false; }
    if (next.isQuoteMark()) { return consumeString(next); }
    if (next.type === types.RUNE) { return consumeRune(next); }

    return next;
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
    if (token.raw !== keywords.FUNC) { return token; }

    return new FuncToken(token);
  }
}

module.exports = CompositeTokenizer;
