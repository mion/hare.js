import * as hare from "./hare";
import * as _ from "lodash";

function main() {
  console.log(hare.tokenize("(hello 1 2 3)"));
  let testCases = [
    {
      args: [
        '(hello 1 2 3)'
      ],
      expected: ['(', 'hello', '1', '2', '3', ')'],
      funcName: 'tokenize'
    }
  ];
  var testId = 1
  let testResults = testCases.map(function (tc) {
    let func:Function = hare[tc.funcName];
    let actual = func.apply(this, tc.args);
    return {
      id: testId++,
      success: _.isEqual(actual, tc.expected),
      funcName: tc.funcName,
      args: tc.args,
      expected: tc.expected,
      actual: actual
    };
  });
  let outputElement = document.getElementById('output');
  outputElement.innerHTML = _.map(testResults, function (tr) {
    let resultSymbol = (tr.success ? '✓' : '✗');
    let resultClass = (tr.success ? 'test-ok': 'test-fail');
    return `<div id="test-${tr.id}" class="test ${resultClass}"><b><span class="symbol">${resultSymbol}</span> ${tr.funcName}(</b><pre>${tr.args}</pre><b>)</b> → <pre>${tr.actual}</pre> ≠ <pre>${tr.expected}</pre></div>`;
  }).join("<br>");
}

main();
