var CompositeTokenizer = require('./lib/composite_tokenizer.js');

var fs = require('fs');
var ms = fs.readFileSync('./spec/fixtures/demo.ms', { encoding: 'UTF-8' });
var types = require('./lib/types.js');

function WhiteSpaceStripper (src){
  var tokenizer = new CompositeTokenizer(ms);

  this.consumeNext = function(){
    var next = tokenizer.consumeNext();

    if (!next) { return false; }

    while (next.type === types.WHITESPACE || next.type === types.NEW_LINE) {
      return this.consumeNext();
    }

    return next;
  };
}


function ExpressionBuilder (src){
  var tokenizer = new WhiteSpaceStripper(src);

  var current = null;
  var next = tokenizer.consumeNext();

  this.current = function(){
    return current;
  };

  this.next = function(){
    return next;
  };

  this.advance = function(){
    current = next;
    next = tokenizer.consumeNext();
    return current;
  };

  this.advance();

  this.consumeNext = function() {
    var c, n, exp;

    c = this.current();
    n = this.next();

    if (c.type === types.RUNE && n.type === types.EQUALS){
      exp = new Assignment(c);
      this.advance();
      this.advance();
      exp.value = this.consumeNext();
    }

    if (c.type === types.OPEN_PAREN && n.type === types.RUNE){
      exp = new Reference(c);
      this.advance();
      this.advance();
    }

    if (c.type === types.OPEN_PAREN && n.type === types.STRING){
      exp = new Value(c);
      this.advance();
      this.advance();
    }

    if (c.type === types.CLOSE_PAREN && n.type === types.RUNE){
      this.advance();
      exp = this.consumeNext();
    }

    if (c.type === types.RUNE && n.type === types.OPEN_PAREN){
      exp = new Call(c);
      this.advance();
      exp.addArg(this.consumeNext());
    }

    if (c.type === types.RUNE && n.type === types.CLOSE_PAREN){
      exp = new Reference(c);
      this.advance();
      this.advance();
    }

    if (c.type === types.STRING && n.type !== types.PLUS){
      exp = new Value(c);
      this.advance();
    }

    return exp;
  };

}


function Assignment (name){
  this.name = name;
  this.value = null;
}

function Value (value){
  this.value = value;
}

function Reference (name){
  this.name = name;
}

function Call (name){
  this.name = name;
  this.args = [];
  this.addArg = function(arg){
    this.args.push(arg);
  };
}

var builder = new ExpressionBuilder(ms);

var tree = [];

var exp;
while ((exp = builder.consumeNext())){
  tree.push(exp);
}

console.log(tree);
