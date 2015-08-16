var keywords = require('./keywords.js');

function Type (name){
  this.name = name;

  this.toString = function(){
    return '<' + name + '>';
  };
}

var PUNCTUATOR = new Type('PUNCTUATOR');
var OPERATOR = new Type('OPERATOR');
var RUNE = new Type('RUNE');
var WHITESPACE = new Type('WHITESPACE');
var STRING = new Type('STRING');
var NEWLINE = new Type('NEWLINE');
var KEYWORD = new Type('KEYWORD');

function StringToken (elementTokenArr){
  this.raw = elementTokenArr;
  this.type = STRING;
  this.toString = function(){
    return this.type.toString() + '\\ ' +

    this.raw.map(function(token){
      return token.toString();
    }).join('');
  };
}

function FuncToken (){
  this.raw = 'func';
  this.isQuoteMark = function(){ return false; };
  this.type = KEYWORD;
  this.toString = function(){
    return this.type.toString() + '\\ ' + keywords.FUNC;
  };
}

function NewLinePunctuator (raw){
  this.raw = raw;
  this.isQuoteMark = function(){ return false; };
  this.type = NEWLINE;
  this.toString = function(){
    return this.type.toString() + '\\ \\n';
  };
}


function Punctuator (raw){
  this.raw = raw;
  this.isQuoteMark = function(){
    return this.raw === '\'' || this.raw === '"';
  };
  this.type = PUNCTUATOR;
  this.toString = function(){
    return this.type.toString() + '\\ ' + this.raw;
  };
}

function Operator (raw){
  this.raw = raw;

  this.isQuoteMark = function () { return false; };
  this.type = OPERATOR;
  this.toString = function(){
    return this.type.toString() + '\\ ' + this.raw;
  };
}

function Rune (raw){
  this.isQuoteMark = function () { return false; };
  this.raw = raw;
  this.type = RUNE;
  this.toString = function(){
    return this.type.toString() + '\\ ' + this.raw;
  };
}

function Whitespace (raw){
  this.isQuoteMark = function () { return false; };
  this.raw = raw;
  this.type = WHITESPACE;
  this.toString = function(){
    return this.type.toString() + '\\ ' + '{' + this.raw.length + '}';
  };
}


module.exports = {
  Punctuator : Punctuator,
  Operator: Operator,
  Rune: Rune,
  Whitespace: Whitespace,
  StringToken: StringToken,
  NewLinePunctuator: NewLinePunctuator,
  FuncToken: FuncToken,
  RUNE: RUNE,
  OPERATOR: OPERATOR
};
