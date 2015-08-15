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

    var token;

    if (FINISHED) {
      return false;
    }

    if (i === 1) {
      return '<BEGIN_INPUT>';
    }

    return consume();
  }
}

function Tokenizer (src){
  var parser = new Parser(src);

  this.consumeNext = function(){
    var raw = parser.consumeNext();
    return raw ? tokenize(raw) : false;
  };

  function tokenize (raw){
    return new Token(raw);
  }

  this.consumeAll = function(){
    var tokens = [];
    var token;

    while ((token = this.consumeNext())) {
      tokens.push(token);
    }

    return tokens;
  };
}

function Token (raw){
  this.original = raw;

  this.toString = function (){
    if (raw === '\n') return '<NEW LINE>';

    if (/^\s+$/.test(raw)) return '<WHITESPACE {' + raw.length + '}>';

    if (raw === '\'') return '<SINGLE QUOTE>';
    if (raw === '"') return '<DOUBLE QUOTE>';

    if (raw === '(') return '<OPEN PAREN>';
    if (raw === ')') return '<CLOSE PAREN>';

    if (raw === '{') return '<OPEN BRACE>';
    if (raw === '}') return '<CLOSE BRACE>';

    if (raw === '+') return '<PLUS>';
    if (raw === '=') return '<EQUAL>';

    return '<RUNE {' + raw + '}>';
  };
}

var fs = require('fs');
var ms = fs.readFileSync('./spec/fixtures/demo.ms', { encoding: 'UTF-8' });

var tokenizer = new Tokenizer(ms);

var tokens = tokenizer.consumeAll();
console.log(tokens.join('\n'));

