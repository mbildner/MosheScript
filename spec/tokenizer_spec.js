'use strict';

var Tokenizer = require('../tokenizer.js');

var src = [
  "func greet () {" ,
  "  return 'hello!'",
  "}"
].join('\n');


describe('Tokenizer', function(){
  describe('#consumeFunction', function(){
    var tokenizer;

    context('named', function(){
      context('no params', function(){

        beforeEach(function(){
          tokenizer = new Tokenizer(src);
        });

        it('consumes input until finished with a function', function(){
          var funcBlock = tokenizer.consumeStatement();

          expect(funcBlock).toEqual({
            type: 'declaration',
            value: {
              type: 'function',
              value: {
                name: 'greet',
                params: [],
                body: [
                  {
                    _return: {
                      type: 'string',
                      value: 'hello!'
                    }
                  }
                ]
              }
            }
          });
        });
      });
    });
  });
});
