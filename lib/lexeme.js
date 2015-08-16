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
    return holder.map(function(t){ return t.toString(); }).join('');
  };
}

module.exports = Lexeme;
