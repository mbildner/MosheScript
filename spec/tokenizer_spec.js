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
  describe('#consumeStatement', function(){
    context('variable declaration and assignment', function(){
      var tokenizer;

      beforeEach(function(){
        var src = "name = 'moshe'";
        tokenizer = new Tokenizer(src);
      });

      it('consumes the declared variable', function(){
        var token = tokenizer.consumeStatement();
        expect(token).toEqual({
          type: 'assignment',
          value: {
            left: {
              type: 'reference',
              value: {
                scope: 'name'
              }
            },
            right: {
              type: 'string',
              value: 'moshe'
            }
          }
        });
      });
    });

    context('function declaration', function(){
      var tokenizer;
      context('anonymous', function(){
        context('multiple params', function(){
          beforeEach(function(){
            var src = [
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
            var src = [
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
        context('multiple params', function(){
          beforeEach(function(){
            var src = [
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
            var src = [
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
});
