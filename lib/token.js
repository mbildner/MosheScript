var types = require('./types.js');

function Token (raw){
  'use strict';

  if (/^\s+$/.test(raw)) {
    return new types.Whitespace(raw);
  }

  switch (raw) {
    case '\n':
      return new types.Punctuator(raw);

    case '\'':
      return new types.Punctuator(raw);

    case '"':
      return new types.Punctuator(raw);

    case '(':
      return new types.Punctuator(raw);

    case ')':
      return new types.Punctuator(raw);

    case '{':
      return new types.Punctuator(raw);

    case '}':
      return new types.Punctuator(raw);

    case '+':
      return new types.Operator(raw);

    case '=':
      return new types.Operator(raw);

    default:
      return new types.Rune(raw);
  }
}

module.exports = Token;
