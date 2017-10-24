import * as hare from "./hare";
import * as _ from "lodash";

const lg = console.log;
const er = console.error;
const wa = console.warn;

function toPrettyString(x: any):string {
  if (_.isString(x)) {
    return `"${x}"`
  } else if (_.isArray(x)) {
    let str = _.map(x, toPrettyString).join(', ')
    return `[${str}]`
  } else if (_.isObject(x)) {
    let pairs = _.map(x, function (value, key) {
      return `${key}: ` + toPrettyString(value);
    });
    return `{${pairs.join(', ')}}`
  } else if (_.isNull(x)) {
    return 'null';
  } else if (_.isUndefined(x)) {
    return 'undefined';
  } else if (_.isNaN(x)) {
    return 'NaN';
  } else {
    return x.toString();
  }
}

function main() {
  console.log(hare.tokenize("(hello 1 2 3)"));
  // tokenize
  let testCases: [ {args: Array<any>, expected: any, funcName: string} ] = [
    {
      args: [
        '(hello 1 2 3)'
      ],
      expected: ['(', 'hello', '1', '2', '3', ')'],
      funcName: 'tokenize'
    },
    {
      args: [
        '(hello (1 2) 3 () 4)'
      ],
      expected: ['(', 'hello', '(', '1', '2', ')', '3', '(', ')', '4', ')'],
      funcName: 'tokenize'
    },
  ];

  // parse
  let rawString = '(define (square x) (* x x))';
  let ctx = new hare.Context();
  let root = new hare.List();
  ctx.add(root);

  let params = new hare.List();
  ctx.add(params);
  ctx.push(params, new hare.Atom('square'));
  ctx.push(params, new hare.Atom('x'));

  let body = new hare.List();
  ctx.add(body);
  ctx.push(body, new hare.Atom('*'));
  ctx.push(body, new hare.Atom('x'));
  ctx.push(body, new hare.Atom('x'));

  ctx.push(root, new hare.Atom('define'));
  ctx.push(root, params);
  ctx.push(root, body);

  testCases.push({
      args: [
        rawString
      ],
      expected: root,
      funcName: 'parse'
  });

  // run tests
  var testId = 1
  let testResults = testCases.map(function (tc) {
    let func:Function = hare[tc.funcName];
    let actual = func.apply(this, tc.args);
    return {
      id: testId++,
      success: _.isEqual(actual, tc.expected),
      funcName: tc.funcName,
      args: _.map(tc.args, toPrettyString).join(', '),
      expected: toPrettyString(tc.expected),
      actual: toPrettyString(actual)
    };
  });
  let testDataById: { [id: string] : { argsString: string, expectedString: string, actualString: string } } = {};
  let outputElement = document.getElementById('hare');
  _.each(testResults, function (tr) {
    // set window variables
    testDataById[tr.id] = {
      argsString: tr.args,
      expectedString: tr.expected,
      actualString: tr.actual
    };
    let resultSymbol = (tr.success ? '✓' : '✗');
    let resultClass = (tr.success ? 'ok': 'fail');
    let testCaseDiv = document.createElement('div');
    let encloseInCellHTML = function (str: string) { return `<div class="cell">${str}</div>`; }
    let cellsHTML = _.map([`#${tr.id}`, resultSymbol, tr.funcName, tr.args, '→', tr.actual, '≠', tr.expected], encloseInCellHTML).join('')
    testCaseDiv.innerHTML = `<div class="test-case ${resultClass}">${cellsHTML}</div>`
    outputElement.appendChild(testCaseDiv);
  }).join("<br>");
  if (_.isUndefined(window['test'])) {
    window['test'] = testDataById;
  } else {
    console.warn("hare.js: variable 'window.test' is already defined. Cannot inject test variables.");
  }
}

main();
