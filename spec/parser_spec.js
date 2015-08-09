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

  context('single character', function(){
    it('returns a string through the character', function(){
      var first = parser.consumeTo('#');
      var second = parser.consumeTo('.');

      expect(first).toBe('first this#');
      expect(second).toBe(' then this.');
    });
  });

  context('longer string', function(){
    it('returns a string through the test string', function(){
      var first = parser.consumeTo('this');
      var second = parser.consumeTo('this.');

      expect(first).toBe('first this');
      expect(second).toBe('# then this.');
    });
  });

  context('regex', function(){
    it('returns a string through the regex', function(){
      var first = parser.consumeTo(/this[\.#]{1}/);
      var second = parser.consumeTo(/this[\.#]{1}/);

      expect(first).toBe('first this#');
      expect(second).toBe(' then this.');
    });
  });
});

