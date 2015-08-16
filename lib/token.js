var types = require('./types.js');

function Token (raw){
  'use strict';

  if (raw === '\n') {
    return new types.NewLinePunctuator(raw);
  }

  if (/^\s+$/.test(raw)) {
    return new types.Whitespace(raw);
  }

  switch (raw) {
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
