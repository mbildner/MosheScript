'use strict';

var Tokenizer = require('../tokenizer.js');

function ast (params, name){
  return {
    type: 'declaration',
    value: {
      type: 'function',
      value: {
        name: name,
        params: params,
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
  };
}

describe('Tokenizer', function(){
  describe('#consumeFunction', function(){
    var tokenizer;
    context('anonymous', function(){
      var src;

      context('multiple params', function(){
        beforeEach(function(){
          src = [
            "func( apples, bananas , potatoes,   eggplant ) {" ,
            "  return 'hello!'",
            "}"
          ].join('\n');
          tokenizer = new Tokenizer(src);
        });

        it('consumes input until finished with a function', function(){
          var funcBlock = tokenizer.consumeStatement();

          expect(funcBlock).toEqual(ast([
            'apples',
            'bananas',
            'potatoes',
            'eggplant'
          ], false));
        });
      });

      context('no params', function(){
        beforeEach(function(){
          src = [
            "func( ) {" ,
            "  return 'hello!'",
            "}"
          ].join('\n');
          tokenizer = new Tokenizer(src);
        });

        it('consumes input until finished with a function', function(){
          var funcBlock = tokenizer.consumeStatement();
          expect(funcBlock).toEqual(ast(
            [],
            false));
        });
      });
    });

    context('named', function(){
      var src;

      context('multiple params', function(){
        beforeEach(function(){
          src = [
            "func greet (cheerios, frostedFlakes, jalapenoOs) {" ,
            "  return 'hello!'",
            "}"
          ].join('\n');
          tokenizer = new Tokenizer(src);
        });

        it('consumes input until finished with a function', function(){
          var funcBlock = tokenizer.consumeStatement();

          expect(funcBlock).toEqual(ast([
            'cheerios',
            'frostedFlakes',
            'jalapenoOs'
          ],'greet'
                                       ));
        });
      });
      context('no params', function(){

        beforeEach(function(){
          src = [
            "func greet () {" ,
            "  return 'hello!'",
            "}"
          ].join('\n');
          tokenizer = new Tokenizer(src);
        });

        it('consumes input until finished with a function', function(){
          var funcBlock = tokenizer.consumeStatement();

          expect(funcBlock).toEqual(ast(
            [],
            'greet'
          ));
        });
      });
    });
  });
});
