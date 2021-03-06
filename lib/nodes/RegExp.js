// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var Alternation, Boundary, cache$, cache$1, Character, CharacterClass, CharacterClassCharacter, CharacterClassRange, charVal, Grouping, Hex, listOf, listOfExactly, Node, oneOf, printableAscii, randomElement, randomInt, RegExp_, RegExpSource, Repetition, Sequence;
  Node = require('../node');
  cache$ = require('../combinators');
  oneOf = cache$.oneOf;
  listOf = cache$.listOf;
  listOfExactly = cache$.listOfExactly;
  cache$1 = require('../random');
  randomInt = cache$1.randomInt;
  randomElement = cache$1.randomElement;
  printableAscii = function () {
    return String.fromCharCode(32 + randomInt(94));
  };
  charVal = function (str) {
    if (str[0] === '\\') {
      switch (str[1]) {
      case 'u':
      case 'x':
        return parseInt(str.slice(2), 16);
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
        return parseInt(str.slice(1), 8);
      case 'b':
        return 8;
      case 't':
        return 9;
      case 'n':
        return 10;
      case 'v':
        return 11;
      case 'f':
        return 12;
      case 'r':
        return 13;
      default:
        return str.charCodeAt(1);
      }
    } else {
      return str.charCodeAt(0);
    }
  };
  Alternation = function (depth) {
    if (!depth--)
      return '';
    return listOf([
      Grouping,
      CharacterClass,
      Repetition,
      Sequence
    ])(depth).join('|');
  };
  Hex = function () {
    var chars;
    chars = '0123456789abcdefABCDEF'.split('');
    return function () {
      return randomElement(chars);
    };
  }();
  Character = function () {
    return oneOf([
      function () {
        var ch;
        while (true) {
          ch = printableAscii();
          if (!in$(ch, [
              '[',
              '(',
              ')',
              '{',
              '?',
              '*',
              '+',
              '|',
              '\\',
              '$',
              '^'
            ]))
            return ch;
        }
      },
      function () {
        return '\\u' + listOfExactly(4, [Hex])().join('');
      },
      function () {
        return '\\x' + listOfExactly(2, [Hex])().join('');
      },
      function () {
        var ch;
        while (true) {
          ch = printableAscii();
          if (!in$(ch, [
              'u',
              'x',
              'b',
              'B',
              'c',
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9'
            ]))
            return '\\' + ch;
        }
      }
    ])();
  };
  Boundary = function () {
    return randomElement([
      '^',
      '$',
      '\\b',
      '\\B'
    ]);
  };
  CharacterClassCharacter = function () {
    var ch;
    ch = '-';
    while (ch === '-' || ch === ']') {
      ch = oneOf([
        Character,
        function () {
          return randomElement([
            '[',
            '(',
            ')',
            '{',
            '?',
            '*',
            '+',
            '|',
            '$'
          ]);
        }
      ])();
    }
    return ch;
  };
  CharacterClassRange = function () {
    var a, b, cache$2, left, right;
    a = CharacterClassCharacter();
    b = CharacterClassCharacter();
    cache$2 = charVal(a) < charVal(b) ? [
      a,
      b
    ] : [
      b,
      a
    ];
    left = cache$2[0];
    right = cache$2[1];
    return '' + left + '-' + right;
  };
  CharacterClass = function (depth) {
    var source;
    if (!depth--)
      return '[]';
    source = listOf([
      CharacterClassCharacter,
      CharacterClassRange
    ])().join('');
    source = source.replace(/\\$/g, '\\a');
    return '[' + randomElement([
      '^',
      '-',
      ''
    ]) + source + randomElement([
      '-',
      ''
    ]) + ']';
  };
  Grouping = function (depth) {
    if (!depth--)
      return '()';
    return '(' + randomElement([
      '?:',
      '?!',
      '?=',
      ''
    ]) + RegExpSource(depth) + ')';
  };
  Repetition = function (depth) {
    if (!depth--)
      return '';
    return '' + oneOf([
      Grouping,
      CharacterClass,
      Character
    ])(depth) + randomElement([
      '?',
      '+',
      '*',
      '*?',
      '+?'
    ]);
  };
  Sequence = function () {
    return listOf([
      Character,
      Boundary
    ])().join('');
  };
  RegExpSource = function (depth) {
    if (!depth--)
      return '';
    return oneOf([
      Alternation,
      Grouping,
      CharacterClass,
      Repetition,
      Sequence
    ])(depth);
  };
  RegExp_ = function (super$) {
    extends$(RegExp_, super$);
    RegExp_.prototype.type = 'Literal';
    function RegExp_() {
      this.value = new RegExp(RegExpSource(8));
    }
    return RegExp_;
  }(Node);
  module.exports = function () {
    return new RegExp_;
  };
  function in$(member, list) {
    for (var i = 0, length = list.length; i < length; ++i)
      if (i in list && list[i] === member)
        return true;
    return false;
  }
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
