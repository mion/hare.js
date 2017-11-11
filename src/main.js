"use strict";
exports.__esModule = true;
var hare = require("./hare");
var _ = require("lodash");
var lg = console.log;
var er = console.error;
var wa = console.warn;
function toPrettyString(x) {
    if (_.isString(x)) {
        return "\"" + x + "\"";
    }
    else if (_.isArray(x)) {
        var str = _.map(x, toPrettyString).join(', ');
        return "[" + str + "]";
    }
    else if (_.isObject(x)) {
        var pairs = _.map(x, function (value, key) {
            return key + ": " + toPrettyString(value);
        });
        return "{" + pairs.join(', ') + "}";
    }
    else if (_.isNull(x)) {
        return 'null';
    }
    else if (_.isUndefined(x)) {
        return 'undefined';
    }
    else if (_.isNaN(x)) {
        return 'NaN';
    }
    else {
        return x.toString();
    }
}
function main() {
    console.log(hare.tokenize("(hello 1 2 3)"));
    // tokenize
    var testCases = [
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
    var rawString = '(define (square x) (* x x))';
    var ctx = new hare.Context();
    var root = new hare.List();
    ctx.add(root);
    var params = new hare.List();
    ctx.add(params);
    ctx.push(params, new hare.Atom('square'));
    ctx.push(params, new hare.Atom('x'));
    var body = new hare.List();
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
    var testId = 1;
    var testResults = testCases.map(function (tc) {
        var func = hare[tc.funcName];
        var actual = func.apply(this, tc.args);
        return {
            id: testId++,
            success: _.isEqual(actual, tc.expected),
            funcName: tc.funcName,
            args: _.map(tc.args, toPrettyString).join(', '),
            expected: toPrettyString(tc.expected),
            actual: toPrettyString(actual)
        };
    });
    var testDataById = {};
    var outputElement = document.getElementById('hare');
    _.each(testResults, function (tr) {
        // set window variables
        testDataById[tr.id] = {
            argsString: tr.args,
            expectedString: tr.expected,
            actualString: tr.actual
        };
        var resultSymbol = (tr.success ? '✓' : '✗');
        var resultClass = (tr.success ? 'ok' : 'fail');
        var testCaseDiv = document.createElement('div');
        var encloseInCellHTML = function (str) { return "<div class=\"cell\">" + str + "</div>"; };
        var cellsHTML = _.map(["#" + tr.id, resultSymbol, tr.funcName, tr.args, '→', tr.actual, '≠', tr.expected], encloseInCellHTML).join('');
        testCaseDiv.innerHTML = "<div class=\"test-case " + resultClass + "\">" + cellsHTML + "</div>";
        outputElement.appendChild(testCaseDiv);
    }).join("<br>");
    if (_.isUndefined(window['test'])) {
        window['test'] = testDataById;
    }
    else {
        console.warn("hare.js: variable 'window.test' is already defined. Cannot inject test variables.");
    }
}
main();
