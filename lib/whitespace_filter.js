var types = require('./types.js');
var CompositeTokenizer = require('./composite_tokenizer.js');

function WhiteSpaceFilter(src){
  'use strict';
  var tokenizer = new CompositeTokenizer(src);

  this.consumeNext = function(){
    var next = tokenizer.consumeNext();

    if (!next) { return false; }

    while (next.type === types.WHITESPACE || next.type === types.NEW_LINE) {
      return this.consumeNext();
    }

    return next;
  };
}

module.exports = WhiteSpaceFilter;
