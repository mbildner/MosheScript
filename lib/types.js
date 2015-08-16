function Type (name){
  this.toString = function(){
    return '<' + name + '>';
  };
}

var punctuator = new Type('PUNCTUATOR');
var operator = new Type('OPERATOR');
var rune = new Type('RUNE');
var whitespace = new Type('WHITESPACE');

module.exports = {
  PUNCTUATOR : punctuator,
  OPERATOR: operator,
  RUNE: rune,
  WHITESPACE: whitespace
};
