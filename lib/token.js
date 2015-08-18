var types = require('./types.js');

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

  if (/^\s+$/.test(raw)) {
    return tokenFor(raw, types.WHITESPACE);
  }

  switch (raw) {
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
