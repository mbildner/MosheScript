function endsWith (haystack, needle){
  'use strict';
  if (typeof needle === 'string') {
    needle = new RegExp(needle + '$');
  }

  return needle.test(haystack);
}

function Parser (src){
  'use strict';
  var anchor = 0;
  var scout = 0;
  var self = this;

  var FINISHED = false;

  this.consumeTo = consumeTo;

  function string (){
    var str = src.slice(anchor, scout);
    return str;
  }

  function currentChar (){
    return src.charAt(scout);
  }

  function finish (){
    anchor = scout;
  }

  function advance (){
    scout += 1;
  }

  function advanceTo (flag){
    var isChar = typeof flag === 'string' && flag.length < 2;
    var isString = typeof flag === 'string' && flag.length > 1;
    var isRegex = typeof flag !== 'string';

    if (isChar) {
      while (currentChar() !== flag){
        advance();
        if (isFinished()){ break; }
      }
      advance();
    }

    if (!isChar) {
      while (!endsWith(string(), flag)){
        advance();
        if (isFinished()){ break; }
      }
    }
  }

  function isFinished (){
    return FINISHED || scout >= src.length;
  }

  function consumeTo (char){
    if (isFinished()) { return null; }
    advanceTo(char);
    var str = string();
    finish();
    return str;
  }
}

module.exports = Parser;
