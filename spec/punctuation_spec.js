var Punctuation = require('../punctuation.js');

describe('Punctuation', function(){
  var punc;

  beforeEach(function(){
    punc = new Punctuation();
  });

  describe('balancedBraces', function(){
    it('tracks open and closed braces', function(){
      expect(punc.balancedBraces()).toBe(true);
      punc.track('[');
      punc.track('(');
      punc.track(')');
      punc.track('{');
      expect(punc.balancedBraces()).toBe(false);
      punc.track('}');
      expect(punc.balancedBraces()).toBe(true);
    });

    it('tracks open and closed brackets', function(){
      expect(punc.balancedBrackets()).toBe(true);
      punc.track('{');
      punc.track('(');
      punc.track(')');
      punc.track('[');
      expect(punc.balancedBrackets()).toBe(false);
      punc.track(']');
      expect(punc.balancedBrackets()).toBe(true);
    });

    it('tracks open and closed parens', function(){
      expect(punc.balancedParens()).toBe(true);
      punc.track('{');
      punc.track(']');
      punc.track('[');
      punc.track('(');
      expect(punc.balancedParens()).toBe(false);
      punc.track(')');
      expect(punc.balancedParens()).toBe(true);
    });
  });
});
