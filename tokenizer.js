var Parser = require('./parser.js');
var Token = require('./token.js');

function Tokenizer (src){
  'use strict';
  var parser = new Parser(src);

  this.consumeNext = function(){
    var raw = parser.consumeNext();
    return raw ? tokenize(raw) : false;
  };

  function tokenize (raw){
    return new Token(raw);
  }
}

module.exports = Tokenizer;
