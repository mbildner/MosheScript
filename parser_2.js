var Token = require('./token.js');
var Tokenizer = require('./tokenizer.js');

function Parser (src){
  var i = 0;
  var j = 0;
  var n = 1;

  var self = this;

  var FINISHED = false;

  this.finished = function(){
    return FINISHED;
  };

  this.finishInput = function (){
    FINISHED = true;
  };

  this.consumeNext = consumeNext;

  function peek (){
    return src.charAt(n);
  }

  function char (){
    return src.charAt(i);
  }

  function advance (){
    i++;
    n++;
  }

  function consume (){
    var str = src.slice(j, i);
    j = i;
    return str;
  }

  function atBoundary (){
    var next = peek();
    var current = char();

    var WS_STARTING = current !== ' ' && next === ' ';
    var WS_ENDING = current === ' ' && next !== ' ';
    var WS = WS_STARTING || WS_ENDING;

    var NEW_LINE = current === '\n';
    var END_OF_LINE = next === '\n';

    var PLUS = next === '+';
    var EQUALS = next === '=';
    var END_OF_INPUT = i > src.length;
    var SINGLE_QUOTE = current === '\'' || next === '\'';
    var DOUBLE_QUOTE = current === '"' || next === '"';

    var CLOSE_BRACE = current === '}';
    var OPEN_BRACE = current === '{';

    var CLOSE_PAREN = next === ')';
    var OPEN_PAREN = next === '(' || current === '(';

    if (END_OF_INPUT) self.finishInput();

    return WS       ||
      END_OF_LINE   ||
      NEW_LINE      ||
      PLUS          ||
      EQUALS        ||
      END_OF_INPUT  ||
      SINGLE_QUOTE  ||
      DOUBLE_QUOTE  ||
      OPEN_BRACE    ||
      CLOSE_BRACE   ||
      OPEN_PAREN    ||
      CLOSE_PAREN;
  }

  function consumeNext (){
    while (!atBoundary()){
      advance();
    }
    advance();

    if (FINISHED) {
      return false;
    }

    if (i === 1) {
      return '<BEGIN_INPUT>';
    }

    return consume();
  }
}

function Lexer (src){
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

function Lexeme (){
  var holder = [];

  this.add = function (token){
    holder.push(token);
  };

  this.type = null;
  this.setType = function(type){
    this.type = type;
  };

  this.toString = function(){
    return token.type + '\n\t' + holder.map(function(token){
      return token.repr;
    }).join('');
  };
}

function Punctuation (){
  var inside = false;

  this.track = function (token){
    if (token.str === '\''){
      inside = !inside;
    }
  };

  this.insideQuotes = function (){
    return inside;
  };
}

