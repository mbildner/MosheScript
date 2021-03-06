var ExpressionBuilder = require('../lib/expression_builder.js');
var Token = require('../lib/token.js');
var types = require('../lib/types.js');
var expressionTypes = require('../lib/expression_types.js');

var fs = require('fs');

var fixtures = {
  simpleAssignment: fs.readFileSync('spec/fixtures/simple_assignment.ms', { encoding: 'UTF-8' }),
  addition: fs.readFileSync('spec/fixtures/addition_expression.ms', { encoding: 'UTF-8' })
};

var expressionTypes = require('../lib/expression_types.js');

var builder;

function strToken(str){
  var openQuote = Token.for("'", types.SINGLE_QUOTE);
  var closeQuote = Token.for("'", types.SINGLE_QUOTE);
  var strValue = Token.for(str, types.RUNE);

  var internal = [openQuote, strValue, closeQuote];

  return Token.for(
    internal,
    types.STRING
  );
}

describe('ExpressionBuilder', function(){
  describe('end of input', function(){
    context('when finished with input', function(){
      it('returns false', function(){
        var builder = new ExpressionBuilder('variable = 12\n');
        builder.consumeNext();
        expect(builder.consumeNext()).toBe(false);
      });
    });
  });

  describe('operators', function(){
    context('plus', function(){
      var builder;
      beforeEach(function(){
        builder = new ExpressionBuilder(fixtures.addition);
      });

      context('one variable one primitive', function(){
        it('returns an addition expression', function(){
          builder.consumeNext();
          builder.consumeNext();
          builder.consumeNext();

          var exp0 = builder.consumeNext();
          var exp1 = builder.consumeNext();

          var addition0 = {
            type: expressionTypes.ADDITION,
            left: {
              type: expressionTypes.REFERENCE,
              value: Token.for('dat_rune_doe', types.RUNE)
            },
            right: {
              type: expressionTypes.VALUE,
              value: strToken('and_dat_string')
            },
          };

          var addition1 = {
            type: expressionTypes.ADDITION,
            left: {
              type: expressionTypes.VALUE,
              value: Token.for('21', types.NUMBER)
            },
            right: {
              type: expressionTypes.REFERENCE,
              value: Token.for('second', types.RUNE)
            }
          };
          expect(JSON.stringify(exp0)).toBe(JSON.stringify(addition0));
          expect(JSON.stringify(exp1)).toBe(JSON.stringify(addition1));
        });
      });

      context('a pair of variables', function(){
        it('returns an addition expression', function(){
          builder.consumeNext();
          builder.consumeNext();
          var exp = builder.consumeNext();

          var addition = {
            type: expressionTypes.ADDITION,
            left: {
              type: expressionTypes.REFERENCE,
              value: Token.for('first', types.RUNE)
            },
            right: {
              type: expressionTypes.REFERENCE,
              value: Token.for('last', types.RUNE)
            },
          };

          expect(JSON.stringify(exp)).toBe(JSON.stringify(addition));
        });
      });

      context('a pair of strings', function(){
        it('returns an addition expression', function(){
          var exp = builder.consumeNext();
          var addition = {
            type: expressionTypes.ADDITION,
            left: {
              type: expressionTypes.VALUE,
              value: Token.for('12', types.NUMBER)
            },
          right: {
            type: expressionTypes.VALUE,
            value: Token.for('43', types.NUMBER)
          }
          };
          expect(JSON.stringify(exp)).toBe(JSON.stringify(addition));
        });
      });

      context('a pair of numbers', function(){
        it('returns an addition expression', function(){
          builder.consumeNext();
          var exp = builder.consumeNext();

          var addition = {
            type: expressionTypes.ADDITION,
            left: {
              type: expressionTypes.VALUE,
              value: strToken('hello')
            },
            right: {
              type: expressionTypes.VALUE,
              value: strToken('world')
            }
          };

          expect(JSON.stringify(exp)).toBe(JSON.stringify(addition));
        });
      });
    });
  });

  describe('variable assignment', function(){
    context('chained assignment', function(){
      it('assigns values to multiple variables', function(){
        builder = new ExpressionBuilder('a = b = c = d = 1\n');

        var exp0 = builder.consumeNext();
        var assignment0 = {
          type: expressionTypes.ASSIGNMENT,
          name: Token.for('a', types.RUNE),
            value: {
              type: expressionTypes.ASSIGNMENT,
              name: Token.for('b', types.RUNE),
                value: {
                  type: expressionTypes.ASSIGNMENT,
                  name: Token.for('c', types.RUNE),
                    value: {
                      type: expressionTypes.ASSIGNMENT,
                      name: Token.for('d', types.RUNE),
                        value: {
                          type: expressionTypes.VALUE,
                          value: Token.for("1", types.NUMBER)
                        }
                    }
                }
            }
        };

        expect(JSON.stringify(exp0)).toBe(JSON.stringify(assignment0));
      });
    });
    context('simple assignment', function(){
      it('assigns primitives to variables', function(){
        builder = new ExpressionBuilder(fixtures.simpleAssignment);

        var exp0 = builder.consumeNext();
        var exp1 = builder.consumeNext();
        var exp2 = builder.consumeNext();
        var exp3 = builder.consumeNext();
        var exp4 = builder.consumeNext();

        var assignment0 = {
          type: expressionTypes.ASSIGNMENT,
          name: Token.for('first', types.RUNE),
            value: {
              type: expressionTypes.VALUE,
              value: strToken('moshe')
            }
        };

        var assignment1 = {
          type: expressionTypes.ASSIGNMENT,
          name: Token.for('last', types.RUNE),
            value: {
              type: expressionTypes.VALUE,
              value: strToken('bildner')
            }
        };

        var assignment2 = {
          type: expressionTypes.ASSIGNMENT,
          name: Token.for('student_id', types.RUNE),
            value: {
              type: expressionTypes.VALUE,
              value: Token.for('123123', types.NUMBER)
            }
        };

        var assignment3 = {
          type: expressionTypes.ASSIGNMENT,
          name: Token.for('name', types.RUNE),
            value: {
              type: expressionTypes.REFERENCE,
              value: Token.for('first', types.RUNE)
            }
        };

        var assignment4 = {
          type: expressionTypes.SCOPED_ASSIGNMENT,
          name: Token.for('age', types.RUNE),
            value: {
              type: expressionTypes.VALUE,
              value: Token.for('26', types.NUMBER)
            }
        };

        expect(JSON.stringify(exp0)).toBe(JSON.stringify(assignment0));
        expect(JSON.stringify(exp1)).toBe(JSON.stringify(assignment1));
        expect(JSON.stringify(exp2)).toBe(JSON.stringify(assignment2));
        expect(JSON.stringify(exp3)).toBe(JSON.stringify(assignment3));
        expect(JSON.stringify(exp4)).toBe(JSON.stringify(assignment4));
      });
    });
  });
});
