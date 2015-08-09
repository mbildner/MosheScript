'use strict';

var Parser = require('../parser.js');

describe('Parser', function(){
  describe('#withinBraces', function(){
    var parser;

    context('inside unbalanced braces', function(){
      beforeEach(function(){
        parser = new Parser('first this {and then inside { also } this } k thanks');
        parser.consumeTo('and then');
      });

      it('returns true', function(){
        expect(parser.withinBraces()).toBe(true);
      });
    });

    context('outside braces', function(){
      beforeEach(function(){
        parser = new Parser('first this {and then inside { also } this } k thanks');
        parser.consumeTo('thanks');
      });

      it('returns true', function(){
        expect(parser.withinBraces()).toBe(false);
      });
    });
  });


  describe('#withinParens', function(){
    var parser;

    context('inside unbalanced parens', function(){
      beforeEach(function(){
        parser = new Parser('first this (and then inside ( also ) this ) k thanks');
        parser.consumeTo('and then');
      });

      it('returns true', function(){
        expect(parser.withinParens()).toBe(true);
      });
    });

    context('outside parens', function(){
      beforeEach(function(){
        parser = new Parser('first this (and then inside ( also ) this ) k thanks');
        parser.consumeTo('thanks');
      });

      it('returns true', function(){
        expect(parser.withinParens()).toBe(false);
      });
    });
  });

  describe('#consumeTo', function(){
    var parser;

    beforeEach(function(){
      parser = new Parser('first this# then this.');
    });

    context('FINISHED', function(){
      beforeEach(function(){
        parser.consumeTo('then this.');
      });

      it('returns null', function(){
        expect(parser.consumeTo('a')).toBeNull();
      });
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


});
