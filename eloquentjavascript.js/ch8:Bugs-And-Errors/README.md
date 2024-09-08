# Chapter notes

### Strict mode

This can done by putting the string "use strict" at the top of a file or a function body. Here’s an example:
```javascript
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined
```

Normally, when you forget to put let in front of your binding, as with counter in the example, JavaScript quietly creates a global binding and uses that. In strict mode, an error is reported instead. This is very helpful. It should be noted, though, that this doesn’t work when the binding in question already exists somewhere in scope. In that case, the loop will still quietly overwrite the value of the binding.

Another change in strict mode is that the this binding holds the value undefined in functions that are not called as methods. When making such a call outside of strict mode, this refers to the global scope object, which is an object whose properties are the global bindings. So if you accidentally call a method or constructor incorrectly in strict mode, JavaScript will produce an error as soon as it tries to read something from this, rather than happily writing to the global scope.

For example, consider the following code, which calls a constructor function without the new keyword so that its this will not refer to a newly constructed object:

```javascript
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand
```
The bogus call to Person succeeded, but returned an undefined value and created the global binding name. In strict mode, the result is different.
"use strict";

```javascript
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined
```
We are immediately told that something is wrong. This is helpful.

In short, putting "use strict" at the top of your program rarely hurts and might help you spot a problem.

### Types

Still, types provide a useful framework for talking about programs. A lot of mistakes come from being confused about the kind of value that goes into or comes out of a function. If you have that information written down, you’re less likely to get confused.

You could add a comment like the following before the findRoute function from the previous chapter to describe its type:

```javascript
// (graph: Object, from: string, to: string) => string[]
function findRoute(graph, from, to) {
  // ...
}
```
When the types of a program are known, it is possible for the computer to check them for you, pointing out mistakes before the program is run. There are several JavaScript dialects that add types to the language and check them. The most popular one is called `TypeScript`. If you are interested in adding more rigor to your programs, I recommend you give it a try.

### Testing

Automated testing is the process of writing a program that tests another program. Writing tests is a bit more work than testing manually, but once you’ve done it, you gain a kind of superpower: it takes you only a few seconds to verify that your program still behaves properly in all the situations you wrote tests for. When you break something, you’ll immediately notice rather than randomly running into it at some later time.

Tests usually take the form of little labeled programs that verify some aspect of your code. For example, a set of tests for the (standard, probably already tested by someone else) toUpperCase method might look like this:

```javascript
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "مرحبا".toUpperCase() == "مرحبا";
});
```
There exist pieces of software that help you build and run collections of tests (test suites) by providing a language (in the form of functions and methods) suited to expressing tests and by outputting informative information when a test fails. These are usually called test runners.

### Debugging

The following example program tries to convert a whole number to a string in a given base (decimal, binary, and so on) by repeatedly picking out the last digit and then dividing the number to get rid of this digit. But the strange output that it currently produces suggests that it has a bug.

```javascript
function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n /= base;
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…
```
Putting a few strategic `console.log calls` into the program is a good way to get additional information about what the program is doing. In this case, we want n to take the values 13, 1, and then 0. Let’s write out its value at the start of the loop.

```
13
1.3
0.13
0.013
…
1.5e-323
```

Right. Dividing 13 by 10 does not produce a whole number. Instead of `n /= base`, what we actually want is `n = Math.floor(n / base)` so that the number is properly “shifted” to the right.

An alternative to using console.log to peek into the program’s behavior is to use the `debugger` capabilities of your browser.

### Error propagation

Not all problems can be prevented by the programmer, unfortunately. If your program communicates with the outside world in any way, it is possible to get malformed input, to become overloaded with work, or to have the network fail.

```javascript
function promptNumber(question) {
  let result = Number(prompt(question));
  if (Number.isNaN(result)) return null;
  else return result;
}

console.log(promptNumber("How many trees do you see?"));
```


