// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var cache$, construct, Expression, Identifier, listOfAtLeast, maybe, Node, Pattern, VariableDeclaration, VariableDeclarator;
  Node = require('../node');
  Expression = require('../classes/Expression');
  Pattern = require('../classes/Pattern');
  Identifier = require('./Identifier');
  cache$ = require('../combinators');
  construct = cache$.construct;
  maybe = cache$.maybe;
  listOfAtLeast = cache$.listOfAtLeast;
  VariableDeclarator = function (super$) {
    extends$(VariableDeclarator, super$);
    VariableDeclarator.prototype.type = VariableDeclarator.name;
    function VariableDeclarator(depth, ancestors) {
      ancestors = [this].concat(ancestors);
      this.id = Pattern(depth, ancestors);
      this.init = maybe(Expression)(depth, ancestors);
    }
    return VariableDeclarator;
  }(Node);
  VariableDeclaration = function (super$) {
    extends$(VariableDeclaration, super$);
    VariableDeclaration.prototype.type = VariableDeclaration.name;
    function VariableDeclaration(depth, ancestors) {
      --depth;
      this.declarations = listOfAtLeast(1, [construct(VariableDeclarator)])(depth, ancestors);
      this.kind = 'var';
    }
    return VariableDeclaration;
  }(Node);
  module.exports = construct(VariableDeclaration);
  function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
  }
  function extends$(child, parent) {
    for (var key in parent)
      if (isOwn$(parent, key))
        child[key] = parent[key];
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }
}.call(this);
