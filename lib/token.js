var types = require('./types.js');

function Token (raw){
  'use strict';
  if (raw === '\n') {
    return {
      type: types.PUNCTUATOR,
      str: raw,
      repr: '<NEW LINE>'
    };
  }

  if (/^\s+$/.test(raw)) {
    return {
      type: types.WHITESPACE,
      str: raw,
      repr: '<WHITESPACE {' + raw.length + '}>'
    };
  }

  if (raw === '\'') {
    return {
      type: types.PUNCTUATOR,
      str: raw,
      repr: '<SINGLE QUOTE>'
    };
  }

  if (raw === '"') {
    return {
      type: types.PUNCTUATOR,
      str: raw,
      repr: '<DOUBLE QUOTE>'
    };
  }

  if (raw === '(') {
    return {
      type: types.PUNCTUATOR,
      str: raw,
      repr: '<OPEN PAREN>'
    };
  }

  if (raw === ')') {
    return {
      type: types.PUNCTUATOR,
      str: raw,
      repr: '<CLOSE PAREN>'
    };
  }

  if (raw === '{') {
    return {
      type: types.PUNCTUATOR,
      str: raw,
      repr: '<OPEN BRACE>'
    };
  }

  if (raw === '}') {
    return {
      type: types.PUNCTUATOR,
      str: raw,
      repr: '<CLOSE BRACE>'
    };
  }

  if (raw === '+') {
    return {
      type: types.OPERATOR,
      str: raw,
      repr: '<PLUS>'
    };
  }

  if (raw === '=') {
    return {
      type: types.OPERATOR,
      str: raw,
      repr: '<EQUALS>'
    };
  }

  return {
    type: types.RUNE,
    str: raw,
    repr: '<RUNE {' + raw + '}>'
  };
}

module.exports = Token;
