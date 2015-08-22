function ExpressionType (name){
  this.name = name;

  this.toString = function(){
    return '<' + name + '>';
  };
}

var types = {
  ASSIGNMENT: new ExpressionType('ASSIGNMENT'),
  VALUE: new ExpressionType('VALUE')
};

module.exports = types;
