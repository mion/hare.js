import * as _ from "lodash";

export function tokenize(str: string) {
  return _.filter(
    str.replace(/\(/g, "( ").replace(/\)/g, " )").split(" "),
    function (s) {
      return !_.isEmpty(s);
    });
}

const LEFT_PARENS = '(';
const RIGHT_PARENS = ')';
const LIST_UNIQUE_ID_PREFIX = 'List_';
const ATOM_UNIQUE_ID_PREFIX = 'Atom_';

export class Expression  {
  id: string;
  constructor(id: string) {
    this.id = id;
  }

  isList():boolean {
    return false;
  }

  isAtom():boolean {
    return false;
  }
}

export class List extends Expression {
  constructor() {
    let uid = _.uniqueId(LIST_UNIQUE_ID_PREFIX);
    super(uid);
  }

  isList():boolean {
    return true;
  }
}

export class Atom extends Expression {
  token: string
  constructor(token: string) {
    let uid = _.uniqueId(ATOM_UNIQUE_ID_PREFIX);
    super(uid);
    this.token = token;
  }

  isAtom():boolean {
    return true;
  }
}

export class Context {
  rootId: string;
  cursorId: string;

  expressionById: { [id: string] : Expression };
  parentById: { [id: string] : Expression };
  childrenById: { [id: string] : Array<Expression> };
  previousById: { [id: string] : Expression };
  nextById: { [id: string] : Expression };

  constructor() {
    this.rootId = null;
    this.cursorId = null;
    this.expressionById = {};
    this.parentById = {};
    this.childrenById = {};
    this.previousById = {};
    this.nextById = {};
  }

  add(exp: Expression) {
    this.expressionById[exp.id] = exp;
  }

  push(list: List, exp: Expression) {
    if (_.isUndefined(this.childrenById[list.id])) {
      this.childrenById[list.id] = new Array<Expression>();
    }
    this.childrenById[list.id].push(exp);
    this.parentById[exp.id] = list;
    if (this.childrenById[list.id].length > 1) {
      let previousExp = _.last(_.dropRight(this.childrenById[list.id]));
      this.previousById[exp.id] = previousExp;
      this.nextById[previousExp.id] = exp;
    }
  }
}

function readFrom(tokens: Array<string>, context: Context):Expression {
  if (_.isEmpty(tokens)) {
    throw new SyntaxError('unexpected EOF while reading');
  } else {
    let token = tokens.shift();
    if (token === LEFT_PARENS) {
      let list = new List();
      context.add(list);
      while (tokens[0] !== RIGHT_PARENS) {
        context.push(list, readFrom(tokens, context))
      }
      tokens.shift();
      return list;
    } else if (token === RIGHT_PARENS) {
      throw new SyntaxError('unexpected )');
    } else {
      let atom = new Atom(token);
      context.add(atom);
      return atom;
    }
  }
}

export function parse(str: string): Context {
  let context = new Context();
  let rootExp = readFrom(tokenize(str), context);
  context.rootId = rootExp.id;
  return context;
}

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
