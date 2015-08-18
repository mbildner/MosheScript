function Parser (src){
  'use strict';

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

    var COMMA = current === ',';

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
      COMMA         ||
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

    return consume();
  }
}


module.exports = Parser;
