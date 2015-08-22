var WhiteSpaceFilter = require('./whitespace_filter.js');
var types = require('./types.js');
var expressionTypes = require('./expression_types.js');

function ExpressionBuilder (src){
  var tokenizer = new WhiteSpaceFilter(src);

  var current = null;
  var next = tokenizer.consumeNext();

  this.current = function(){
    return current;
  };

  this.next = function(){
    return next;
  };

  this.advance = function(){
    current = next;
    next = tokenizer.consumeNext();
    return current;
  };

  this.advance();

  this.consumeNext = function(){
    var exp = {};

    if (
      this.current().type === types.RUNE &&
      this.next().type === types.EQUALS
    ){
        exp.type = expressionTypes.ASSIGNMENT;
        exp.name = this.current();

        // move past name and equals
        this.advance();
        this.advance();

        exp.value = this.consumeNext();

      }

      if (
        this.current().type === types.STRING &&
        this.next().type === types.RUNE
      ){
        exp.type = expressionTypes.VALUE;
        exp.value = this.current();
        // move past the string
        this.advance();
      }


      return exp;
  };


}

module.exports = ExpressionBuilder;
