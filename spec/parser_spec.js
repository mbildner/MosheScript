'use strict';

var fs = require('fs');
var Parser = require('../parser.js');

var demo = fs.readFileSync('./demo.ms', { encoding: 'UTF-8' });

beforeEach(function(){
});

describe('#consumeTo', function(){
  var parser;

  beforeEach(function(){
    parser = new Parser('first this# then this.');
  });

  it('returns a string up to the character', function(){
    var first = parser.consumeTo('#');
    var second = parser.consumeTo('.');

    expect(first).toBe('first this');
    expect(second).toBe('# then this');
  });
});

describe('#consumeThrough', function(){
  var parser;

  beforeEach(function(){
    parser = new Parser('first this# then this.');
  });

  it('returns a string up to the character', function(){
    var first = parser.consumeThrough('#');
    var second = parser.consumeThrough('.');

    expect(first).toBe('first this#');
    expect(second).toBe(' then this.');
  });
});
