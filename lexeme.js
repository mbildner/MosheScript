function Lexeme (){
  'use strict';
  var holder = [];

  this.add = function (token){
    holder.push(token);
  };

  this.type = null;
  this.setType = function(type){
    this.type = type;
  };

  this.toString = function(){
    return this.type + '\n\t' + holder.map(function(token){
      return token.repr;
    }).join('');
  };
}

module.exports = Lexeme;
