(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sayHello(compiler) {
    return "Hello from " + compiler;
}
exports.sayHello = sayHello;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerText = greet_1.sayHello(name);
}
showHello("greeting", "TypeScript");

},{"./greet":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ3JlZXQudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsa0JBQXlCLFFBQWdCO0lBQ3ZDLE1BQU0sQ0FBQyxnQkFBYyxRQUFVLENBQUM7QUFDbEMsQ0FBQztBQUZELDRCQUVDOzs7OztBQ0ZELGlDQUFrQztBQUVsQyxtQkFBbUIsT0FBZSxFQUFFLElBQVk7SUFDNUMsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxHQUFHLENBQUMsU0FBUyxHQUFHLGdCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGZ1bmN0aW9uIHNheUhlbGxvKGNvbXBpbGVyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGBIZWxsbyBmcm9tICR7Y29tcGlsZXJ9YDtcbn1cbiIsImltcG9ydCB7IHNheUhlbGxvIH0gZnJvbSBcIi4vZ3JlZXRcIlxuXG5mdW5jdGlvbiBzaG93SGVsbG8oZGl2TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZOYW1lKTtcbiAgICBlbHQuaW5uZXJUZXh0ID0gc2F5SGVsbG8obmFtZSk7XG59XG5cbnNob3dIZWxsbyhcImdyZWV0aW5nXCIsIFwiVHlwZVNjcmlwdFwiKTtcbiJdfQ==
