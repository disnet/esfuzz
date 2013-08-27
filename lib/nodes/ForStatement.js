// Generated by CoffeeScript 2.0.0-beta5
void function () {
  var cache$, Expression, maybe, oneOf, Statement, TYPE, VariableDeclaration;
  Expression = require('../classes/Expression');
  Statement = require('../classes/Statement');
  VariableDeclaration = require('./VariableDeclaration');
  cache$ = require('../combinators');
  oneOf = cache$.oneOf;
  maybe = cache$.maybe;
  TYPE = 'ForStatement';
  module.exports = function (depth) {
    --depth;
    return {
      type: TYPE,
      init: maybe(oneOf([
        VariableDeclaration,
        Expression
      ]))(depth),
      test: maybe(Expression)(depth),
      update: maybe(Expression)(depth),
      body: Statement(depth)
    };
  };
}.call(this);