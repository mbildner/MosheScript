var types = require('./types.js');

function Punctuation (){
  'use strict';
  var inside = false;

  this.track = function (token){
    if (token.type === types.SINGLE_QUOTE || token.type === types.DOUBLE_QUOTE){
      inside = !inside;
    }
  };

  this.insideQuotes = function (){
    return inside;
  };
}

module.exports = Punctuation;
