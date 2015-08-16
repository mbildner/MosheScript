var Tokenizer = require('./tokenizer.js');
var Lexeme = require('./lexeme.js');
var Punctuation = require('./punctuation.js');

function Lexer (src){
  'use strict';
  var tokenizer = new Tokenizer(src);

  this.consumeNext = function (){
    var next = tokenizer.consumeNext();

    if (!next) { return false ;}

    if (next.repr === '<SINGLE QUOTE>' || next.repr === '<DOUBLE QUOTE>'){
      return consumeStringLexeme(next);
    }

    return consumeGenericLexeme(next);
  };

  function consumeGenericLexeme (startToken){
    var lexeme = new Lexeme();
    lexeme.add(startToken);
    lexeme.setType(startToken.type);
    return lexeme;
  }

  function consumeStringLexeme (startToken){
    var punc = new Punctuation();
    var lexeme = new Lexeme();

    punc.track(startToken);
    lexeme.add(startToken);
    lexeme.setType('<STRING>');

    var next;
    while (punc.insideQuotes()){
      next = tokenizer.consumeNext();
      punc.track(next);
      lexeme.add(next);
    }

    return lexeme;
  }
}

module.exports = Lexer;
