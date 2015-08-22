function Type (name){
  this.name = name;

  this.toString = function(){
    return '<' + name + '>';
  };
}

var types = {
  STRING: new Type('STRING'),
  NUMBER: new Type('NUMBER'),
  LET: new Type('LET'),
  RUNE: new Type('RUNE'),
  WHITESPACE: new Type('WHITESPACE'),
  NEW_LINE: new Type('NEW_LINE'),
  KEYWORD: new Type('KEYWORD'),
  NAME: new Type('NAME'),
  SINGLE_QUOTE: new Type('SINGLE_QUOTE'),
  DOUBLE_QUOTE: new Type('DOUBLE_QUOTE'),
  OPEN_PAREN: new Type('OPEN_PAREN'),
  CLOSE_PAREN: new Type('CLOSE_PAREN'),
  OPEN_BRACE: new Type('OPEN_BRACE'),
  CLOSE_BRACE: new Type('CLOSE_BRACE'),
  EQUALS: new Type('EQUALS'),
  PLUS: new Type('PLUS'),
  COMMA: new Type('COMMA')
};

module.exports = types;
