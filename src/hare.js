"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _ = require("lodash");
function tokenize(str) {
    return _.filter(str.replace(/\(/g, "( ").replace(/\)/g, " )").split(" "), function (s) {
        return !_.isEmpty(s);
    });
}
exports.tokenize = tokenize;
var LEFT_PARENS = '(';
var RIGHT_PARENS = ')';
var LIST_UNIQUE_ID_PREFIX = 'List_';
var ATOM_UNIQUE_ID_PREFIX = 'Atom_';
var Expression = /** @class */ (function () {
    function Expression(id) {
        this.id = id;
    }
    Expression.prototype.isList = function () {
        return false;
    };
    Expression.prototype.isAtom = function () {
        return false;
    };
    return Expression;
}());
exports.Expression = Expression;
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = this;
        var uid = _.uniqueId(LIST_UNIQUE_ID_PREFIX);
        _this = _super.call(this, uid) || this;
        return _this;
    }
    List.prototype.isList = function () {
        return true;
    };
    return List;
}(Expression));
exports.List = List;
var Atom = /** @class */ (function (_super) {
    __extends(Atom, _super);
    function Atom(token) {
        var _this = this;
        var uid = _.uniqueId(ATOM_UNIQUE_ID_PREFIX);
        _this = _super.call(this, uid) || this;
        _this.token = token;
        return _this;
    }
    Atom.prototype.isAtom = function () {
        return true;
    };
    return Atom;
}(Expression));
exports.Atom = Atom;
var Context = /** @class */ (function () {
    function Context() {
        this.rootId = null;
        this.cursorId = null;
        this.expressionById = {};
        this.parentById = {};
        this.childrenById = {};
        this.previousById = {};
        this.nextById = {};
    }
    Context.prototype.add = function (exp) {
        this.expressionById[exp.id] = exp;
    };
    Context.prototype.push = function (list, exp) {
        if (_.isUndefined(this.childrenById[list.id])) {
            this.childrenById[list.id] = new Array();
        }
        this.childrenById[list.id].push(exp);
        this.parentById[exp.id] = list;
        if (this.childrenById[list.id].length > 1) {
            var previousExp = _.last(_.dropRight(this.childrenById[list.id]));
            this.previousById[exp.id] = previousExp;
            this.nextById[previousExp.id] = exp;
        }
    };
    return Context;
}());
exports.Context = Context;
function readFrom(tokens, context) {
    if (_.isEmpty(tokens)) {
        throw new SyntaxError('unexpected EOF while reading');
    }
    else {
        var token = tokens.shift();
        if (token === LEFT_PARENS) {
            var list = new List();
            context.add(list);
            while (tokens[0] !== RIGHT_PARENS) {
                context.push(list, readFrom(tokens, context));
            }
            tokens.shift();
            return list;
        }
        else if (token === RIGHT_PARENS) {
            throw new SyntaxError('unexpected )');
        }
        else {
            var atom = new Atom(token);
            context.add(atom);
            return atom;
        }
    }
}
function parse(str) {
    var context = new Context();
    var rootExp = readFrom(tokenize(str), context);
    context.rootId = rootExp.id;
    return context;
}
exports.parse = parse;
// readFrom: (tokens, context) ->
//   throw new SyntaxError("unexpected EOF while reading") if _.isEmpty(tokens)
//   token = tokens.shift()
//   if token is "("
//     list = new List(context)
//     while tokens[0] isnt ")"
//       @context.push(list, @readFrom(tokens, context))
//     tokens.shift()
//     return list
//   else if token is ")"
//     throw new SyntaxError("unexpected )")
//   else
//     return new Atom(token, context)
// parse: ->
//   exp = @readFrom(@tokenize(@string), @context)
//   @context.root_id = exp.id
