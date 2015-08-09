function Punctuation (){
  'use strict';

  var marks = {
    brace: {
      open: 0,
      close: 0
    },
    bracket: {
      open: 0,
      close: 0
    },
    paren: {
      open: 0,
      close: 0
    }
  };

  this.track = track;
  this.balancedBraces = balancedBraces;
  this.balancedBrackets = balancedBrackets;
  this.balancedParens = balancedParens;

  function track (char){
    switch (char) {
      case '{':
        openBrace();
      break;

      case '}':
        closeBrace();
      break;

      case '[':
        openBracket();
      break;

      case ']':
        closeBracket();
      break;

      case '(':
        openParen();
      break;

      case ')':
        closeParen();
      break;

      default:
        // noop
    }
  }

  function openBrace (){
    marks.brace.open++;
  }

  function closeBrace (){
    marks.brace.close++;
  }

  function balancedBraces (){
    return marks.brace.close === marks.brace.open;
  }

  function openBracket (){
    marks.bracket.open++;
  }

  function closeBracket (){
    marks.bracket.close++;
  }

  function balancedBrackets (){
    return marks.bracket.close === marks.bracket.open;
  }

  function openParen (){
    marks.paren.open++;
  }

  function closeParen (){
    marks.paren.close++;
  }

  function balancedParens (){
    return marks.paren.close === marks.paren.open;
  }
}

module.exports = Punctuation;
