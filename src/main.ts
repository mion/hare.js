import * as hare from "./hare";
import * as _ from "lodash";

function toHTML(x: any): string {
  if (_.isString(x)) {
    return `<pre class="string">"${x}"</pre>`;
  } else if (_.isInteger(x)) {
    return `<pre class="integer">${x}</pre>`;
  } else if (_.isNumber(x)) {
    return `<pre class="number">${x}</pre>`;
  } else if (_.isArray(x)) {
    let html = x.map(toHTML).join("<b>, </b>");
    return `<pre class="array">${html}</pre>`;
  } else {
    return `<pre class="thing">${x.toString()}</pre>`;
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
      args: toHTML(tc.args),
      expected: toHTML(tc.expected),
      actual: toHTML(actual)
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
