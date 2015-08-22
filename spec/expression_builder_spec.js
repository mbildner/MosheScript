var ExpressionBuilder = require('../lib/expression_builder.js');
var Token = require('../lib/token.js');
var types = require('../lib/types.js');
var expressionTypes = require('../lib/expression_types.js');

var fs = require('fs');

var fixtures = {
  simpleAssignment: fs.readFileSync('spec/fixtures/simple_assignment.ms', { encoding: 'UTF-8' })
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
  context('variable assignment', function(){
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
