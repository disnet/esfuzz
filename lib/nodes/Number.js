// Generated by CoffeeScript 2.0.0-beta5
void function () {
  var oneOf, randomInt, TYPE;
  oneOf = require('../combinators').oneOf;
  randomInt = require('../helpers').randomInt;
  TYPE = 'Literal';
  module.exports = function () {
    return oneOf([
      function () {
        return {
          type: TYPE,
          value: 0
        };
      },
      function () {
        return {
          type: TYPE,
          value: 0,
          raw: '0.'
        };
      },
      function () {
        return {
          type: TYPE,
          value: 0,
          raw: '.0'
        };
      },
      function () {
        var int;
        int = randomInt(Math.pow(2, 53) - 1);
        return {
          type: TYPE,
          value: int,
          raw: function () {
            switch (randomInt(10)) {
            case 0:
              return '' + oneOf([
                '0',
                '00',
                '000',
                '0000'
              ]) + int.toString(8);
            case 1:
              return '0' + oneOf([
                'x',
                'X'
              ]) + int.toString(16);
            default:
              return int.toString();
            }
          }.call(this)
        };
      }
    ])();
  };
}.call(this);