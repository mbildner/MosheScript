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

    var AT_END = !(this.current() && this.next());

    if (
      this.current().isPrimitive() &&
      this.next().type === types.PLUS
    ){
      exp.type = expressionTypes.ADDITION;

      exp.left = {
        type: expressionTypes.VALUE,
        value: this.current()
      };

      this.advance();
      this.advance();

      exp.right = this.consumeNext();

      return exp;

    }

    if (
      !AT_END &&
      this.current().isPrimitive() &&
      this.next().isPrimitive()
    ){
      exp.type = expressionTypes.VALUE;
      exp.value = this.current();
      return exp;
    }

    if (
      this.current().isPrimitive() && AT_END
    ){
      exp.type = expressionTypes.VALUE;
      exp.value = this.current();
      return exp;
    }

    if (
      this.current().isPrimitive() &&
      this.next().type === types.LET
    ){
      // nope, floating values are stupid
      // throw a parse error?
      this.advance();
      return this.consumeNext();
    }

    if (
      this.current().type === types.RUNE &&
      (
        this.next().isPrimitive() ||
        AT_END
      )
    ){
      exp.type = expressionTypes.REFERENCE;
      exp.value = this.current();
      this.advance();
      return exp;
    }


    if (
      this.current().type === types.LET &&
      this.next().type === types.RUNE
    ) {

      exp.type = expressionTypes.SCOPED_ASSIGNMENT;
      exp.name = this.next();

      // move past equals
      this.advance();
      this.advance();
      this.advance();

      exp.value = this.consumeNext();

      return exp;
    }

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
        return exp;

      }

      if (
        this.next().type === types.RUNE &&
        (
          this.current().type === types.STRING ||
         this.current().type === types.NUMBER
        )
      ){
        exp.type = expressionTypes.VALUE;
        exp.value = this.current();
        // move past the primitive
        this.advance();
        return exp;
      }
  };


}

module.exports = ExpressionBuilder;
