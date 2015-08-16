function Punctuation (){
  'use strict';
  var inside = false;

  this.track = function (token){
    if (token.str === '\''){
      inside = !inside;
    }
  };

  this.insideQuotes = function (){
    return inside;
  };
}

module.exports = Punctuation;
