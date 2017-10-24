import * as hare from "./hare";
import * as _ from "lodash";

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
  } else {
    return x.toString();
  }
}

function main() {
  console.log(hare.tokenize("(hello 1 2 3)"));
  let testCases = [
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
  let outputElement = document.getElementById('hare');
  _.each(testResults, function (tr) {
    let resultSymbol = (tr.success ? '✓' : '✗');
    let resultClass = (tr.success ? 'ok': 'fail');
    let testCaseDiv = document.createElement('div');
    let encloseInCellHTML = function (str) { return `<div class="cell">${str}</div>`; }
    let cellsHTML = _.map([resultSymbol, tr.funcName, tr.args, '→', tr.actual, '≠', tr.expected], encloseInCellHTML).join('')
    testCaseDiv.innerHTML = `<div class="test-case ${resultClass}">${cellsHTML}</div>`
    outputElement.appendChild(testCaseDiv);
  }).join("<br>");
}

main();
