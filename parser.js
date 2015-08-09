function Parser (src){
  'use strict';
  var anchor = 0;
  var scout = 0;
  var self = this;

  this.FINISHED = false;
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
    if (scout >= src.length){
      self.FINISHED = true;
    }
    scout += 1;
  }

  function advanceTo (char){
    while (currentChar() !== char){
      advance();
      if (self.FINISHED){ break; }
    }
    advance();
  }

  function consumeTo (char){
    advanceTo(char);
    var str = string();
    finish();
    return str;
  }
}

module.exports = Parser;
