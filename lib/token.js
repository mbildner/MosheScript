var types = require('./types.js');

var WHITESPACE_REGEX = /^\s+$/;
var NUMBER_REGEX = /^\d+(\.\d+)?$/;

function tokenFor (raw, type){
  if (!type) { throw new TypeError('type argument is required'); }

  function rawStr () {
    return Array.isArray(raw)
      ? raw.map(function(token){ return token.toString(); }).join(', ')
      : raw.toString();
  }

  return {
    raw: raw,
    type: type,
    isPrimitive: function(){
      return this.type === types.STRING || this.type === types.NUMBER;
    },
    toString: function(){
      return this.type.toString() + '\ ' + rawStr();
    }
  };
}

function Token (raw){
  'use strict';

  if (raw === '\n') {
    return tokenFor(raw, types.NEW_LINE);
  }

  if (WHITESPACE_REGEX.test(raw)) {
    return tokenFor(raw, types.WHITESPACE);
  }

  if (NUMBER_REGEX.test(raw)){
    return tokenFor(raw, types.NUMBER);
  }

  switch (raw) {
    case 'let':
      return tokenFor(raw, types.LET);

    case '\'':
      return tokenFor(raw, types.SINGLE_QUOTE);

    case '"':
      return tokenFor(raw, types.DOUBLE_QUOTE);

    case '(':
      return tokenFor(raw, types.OPEN_PAREN);

    case ')':
      return tokenFor(raw, types.CLOSE_PAREN);

    case '{':
      return tokenFor(raw, types.OPEN_BRACE);

    case '}':
      return tokenFor(raw, types.CLOSE_BRACE);

    case '+':
      return tokenFor(raw, types.PLUS);

    case '=':
      return tokenFor(raw, types.EQUALS);

    case ',':
      return tokenFor(raw, types.COMMA);

    default:
      return tokenFor(raw, types.RUNE);
  }
}

Token.for = function(raw, type) { return tokenFor(raw, type); };

module.exports = Token;
