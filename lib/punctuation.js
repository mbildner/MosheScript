function Punctuation (){
  'use strict';
  var inside = false;

  this.track = function (token){
    if (token.isQuoteMark()){
      inside = !inside;
    }
  };

  this.insideQuotes = function (){
    return inside;
  };
}

module.exports = Punctuation;
