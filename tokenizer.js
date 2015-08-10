var Parser = require('./parser.js');


var IDENTIFIER_REGEX = /^func/;
var FUNC_NAME_REGEX = /\s*\(/;
var PARAM_REGEX = /,|\)/;
var STRAY_PARAM_REGEX = /\s*\)/;
var RETURN_STATEMENT_REGEX = /\n*\s*return\s*/;

function Tokenizer (src){
  var parser = new Parser(src);

  this.consumeStatement = consumeStatement;

  function consumeStatement (){
    var identifier = parser.consumeTo(IDENTIFIER_REGEX);
    var name = parser.consumeTo(FUNC_NAME_REGEX);

    var cleanName = name.replace(/\s*\(/, '').replace(/^\s*/, '') || false;

    var params = [];
    var param;

    while (parser.withinParens()){
      param = parser.consumeTo(PARAM_REGEX);
      params.push(param);
    }

    var cleanParams = params
      .map(function(statement){
        return statement
        .replace(/\s*\)/, '')
        .replace(/\s*,\s*/, '')
        .trim()
      })
      .filter(function(statement){
        return statement.length > 0;
      })
      .filter(function(statement){
        return !STRAY_PARAM_REGEX.test(statement);
      });

    parser.consumeTo('{');

    var body = [];
    while (parser.withinBraces()){
      body.push(parser.consumeTo('}'));
    }

    var bodyWithReturnMarked = body.map(function(statement){
      return statement.slice(0, -1).replace(/'/g, '').trim();
    })
    .filter(function(statement){
      return !STRAY_PARAM_REGEX.test(statement);
    })
    .map(function(statement){
      if (RETURN_STATEMENT_REGEX.test(statement)) {
        return {
          _return: {
            type: 'string',
            value: statement.replace(/return\s+/, '')
          }
        };
      }
    });

    return {
      type: 'declaration',
      value: {
        type: 'function',
        value: {
          name: cleanName,
          params: cleanParams,
          body: bodyWithReturnMarked
        }
      }
    };
  }
}

module.exports = Tokenizer;
