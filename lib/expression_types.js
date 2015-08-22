function ExpressionType (name){
  this.name = name;

  this.toString = function(){
    return '<' + name + '>';
  };
}

var types = {
  ASSIGNMENT: new ExpressionType('ASSIGNMENT'),
  VALUE: new ExpressionType('VALUE'),
  REFERENCE: new ExpressionType('REFERENCE'),
  SCOPED_ASSIGNMENT: new ExpressionType('SCOPED_ASSIGNMENT')
};

module.exports = types;
