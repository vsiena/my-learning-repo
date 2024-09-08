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

### Exceptions

When a function cannot proceed normally, what we would often `like` to do is just stop what we are doing and immediately jump to a place that knows how to handle the problem. This is what `exception handling` does.

Here’s an example:

```javascript
function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}
```

The throw keyword is used to raise an exception. Catching one is done by wrapping a piece of code in a try block, followed by the keyword catch. When the code in the try block causes an exception to be raised, the catch block is evaluated, with the name in parentheses bound to the exception value. After the catch block finishes—or if the try block finishes without problems—the program proceeds beneath the entire try/catch statement.

In this case, we used the Error constructor to create our exception value. This is a standard JavaScript constructor that creates an object with a message property. Instances of Error also gather information about the call stack that existed when the exception was created, a so-called stack trace. This information is stored in the stack property and can be helpful when trying to debug a problem: it tells us the function where the problem occurred and which functions made the failing call.

Note that the look function completely ignores the possibility that promptDirection might go wrong. This is the big advantage of exceptions: error-handling code is necessary only at the point where the error occurs and at the point where it is handled. The functions in between can forget all about it.

Well, almost...

### Cleaning up after exceptions

Here is some really bad banking code:

```javascript
const accounts = {
  a: 100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!Object.hasOwn(accounts, accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount()] += amount;
}
```

The `transfer` function transfers a sum of money from a given account to another, asking for the name of the other account in the process. If given an invalid account name, getAccount throws an exception.

But `transfer` first removes the money from the account and then calls getAccount before it adds it to another account. If it is broken off by an exception at that point, it’ll just make the money disappear.

Since that isn’t always practical, try statements have another feature: they may be followed by a finally block either instead of or in addition to a catch block. A finally block says “no matter what happens, run this code after trying to run the code in the try block.”

```javascript
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}
```
This version of the function tracks its progress, and if, when leaving, it notices that it was aborted at a point where it had created an inconsistent program state, it repairs the damage it did.

Note that even though the finally code is run when an exception is thrown in the try block, it does not interfere with the exception. After the finally block runs, the stack continues unwinding.

### Selective catching

Rather, let’s define a new type of error and use instanceof to identify it.

```javascript
class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}
```
The new error class extends Error. It doesn’t define its own constructor, which means that it inherits the Error constructor, which expects a string message as argument. In fact, it doesn’t define anything at all—the class is empty. InputError objects behave like Error objects, except that they have a different class by which we can recognize them.

Now the loop can catch these more carefully.

```javascript
for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log("Not a valid direction. Try again.");
    } else {
      throw e;
    }
  }
}
```
This will catch only instances of InputError and let unrelated exceptions through. If you reintroduce the typo, the undefined binding error will be properly reported.

### Assertions

`Assertions` are checks inside a program that verify that something is the way it is supposed to be. They are used not to handle situations that can come up in normal operation but to find programmer mistakes.

If, for example, `firstElement` is described as a function that should never be called on empty arrays, we might write it like this:

```javacript
function firstElement(array) {
  if (array.length == 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}
```
Now, instead of silently returning undefined (which you get when reading an array property that does not exist), this will loudly blow up your program as soon as you misuse it. This makes it less likely for such mistakes to go unnoticed and easier to find their cause when they occur.

