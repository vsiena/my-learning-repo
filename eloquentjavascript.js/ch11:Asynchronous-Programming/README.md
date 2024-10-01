# Chapter notes

### Promises

A slightly different way to build an asynchronous program is to have asynchronous functions return an object that represents its (future) result instead of passing around callback functions.

This is what the standard class `Promise` is for. A `promise` is a receipt representing a value that may not be available yet. It provides a `then` method that allows you to register a function that should be called when the action for which it is waiting finishes. When the promise is `resolved`, meaning its value becomes available, such functions (there can be multiple) are called with the result value. It is possible to call then on a promise that has already resolved—your function will still be called.

The easiest way to create a promise is by calling `Promise.resolve`. This function ensures that the value you give it is wrapped in a promise. If it’s already a promise, it is simply returned. Otherwise, you get a new promise that immediately resolves with your value as its result.

```javascript
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// → Got 15
```
To create a promise that does not immediately resolve, you can use `Promise` as a constructor. It has a somewhat odd interface: the constructor expects a function as its argument, which it immediately calls, passing it a function that it can use to resolve the promise.

For example, this is how you could create a promise-based interface for the `readTextFile` function:

```javascript
function textFile(filename) {
  return new Promise(resolve => {
    readTextFile(filename, text => resolve(text));
  });
}

textFile("plans.txt").then(console.log);
```
Note how, in contrast to callback-style functions, this asynchronous function returns a meaningful value—a promise to give you the contents of the file at some point in the future.

A useful thing about the `then` method is that it itself returns another promise. This one resolves to the value returned by the callback function or, if that returned value is a promise, to the value that promise resolves to. Thus, you can “chain” multiple calls to then together to set up a sequence of asynchronous actions.

This function, which reads a file full of filenames and returns the content of a random file in that list, shows this kind of asynchronous promise pipeline:

```javascript
function randomFile(listFile) {
  return textFile(listFile)
    .then(content => content.trim().split("\n"))
    .then(ls => ls[Math.floor(Math.random() * ls.length)])
    .then(filename => textFile(filename));
}
```

The function returns the result of this chain of then calls. The initial promise fetches the list of files as a string. The first then call transforms that string into an array of lines, producing a new promise. The second then call picks a random line from that, producing a third promise that yields a single filename. The final then call reads this file, so the result of the function as a whole is a promise that returns the content of a random file.

It would also have been possible to perform all these steps inside a single then callback, since only the last step is actually asynchronous. But the kind of then wrappers that only do some synchronous data transformation are often useful, such as when you want to return a promise that produces a processed version of some asynchronous result.

```javascript
function jsonFile(filename) {
  return textFile(filename).then(JSON.parse);
}

jsonFile("package.json").then(console.log);
```

Generally, it is useful to think of a promise as a device that lets code ignore the question of when a value is going to arrive. A normal value has to actually exist before we can reference it. A promised value is a value that might already be there or might appear at some point in the future. Computations defined in terms of promises, by wiring them together with `then` calls, are executed asynchronously as their inputs become available.

### Failure

Regular JavaScript computations can fail by throwing an exception. Asynchronous computations often need something like that. A network request may fail, a file may not exist, or some code that is part of the asynchronous computation may throw an exception.

One of the most pressing problems with the callback style of asynchronous programming is that it makes it extremely difficult to ensure failures are properly reported to the callbacks.

A common convention is to use the first argument to the callback to indicate that the action failed, and the second to pass the value produced by the action when it was successful.

```javascript
someAsyncFunction((error, value) => {
  if (error) handleError(error);
  else processValue(value);
});
```

Such callback functions must always check whether they received an exception and make sure that any problems they cause, including exceptions thrown by functions they call, are caught and given to the right function.

Promises make this easier. They can be either resolved (the action finished successfully) or rejected (it failed). Resolve handlers (as registered with then) are called only when the action is successful, and rejections are propagated to the new promise returned by then. When a handler throws an exception, this automatically causes the promise produced by its then call to be rejected. If any element in a chain of asynchronous actions fails, the outcome of the whole chain is marked as rejected, and no success handlers are called beyond the point where it failed.

Much like resolving a promise provides a value, rejecting one also provides a value, usually called the `reason` of the rejection. When an exception in a handler function causes the rejection, the exception value is used as the reason. Similarly, when a handler returns a promise that is rejected, that rejection flows into the next promise. There’s a `Promise.reject` function that creates a new, immediately rejected promise.

To explicitly handle such rejections, promises have a `catch` method that registers a handler to be called when the promise is rejected, similar to how then handlers handle normal resolution. It’s also very much like then in that it returns a new promise, which resolves to the original promise’s value when that resolves normally and to the result of the catch handler otherwise. If a `catch` handler throws an error, the new promise is also rejected.

As a shorthand, then also accepts a rejection handler as a second argument, so you can install both types of handlers in a single method call: `.then(acceptHandler, rejectHandler)`.

A function passed to the Promise constructor receives a second argument, alongside the resolve function, which it can use to reject the new promise.

When our readTextFile function encounters a problem, it passes the error to its callback function as a second argument. Our textFile wrapper should actually check that argument so that a failure causes the promise it returns to be rejected.

```javascript
function textFile(filename) {
  return new Promise((resolve, reject) => {
    readTextFile(filename, (text, error) => {
      if (error) reject(error);
      else resolve(text);
    });
  });
}
```

The chains of promise values created by calls to then and catch thus form a pipeline through which asynchronous values or failures move. Since such chains are created by registering handlers, each link has a success handler or a rejection handler (or both) associated with it. Handlers that don’t match the type of outcome (success or failure) are ignored. Handlers that do match are called, and their outcome determines what kind of value comes next—success when they return a non-promise value, rejection when they throw an exception, and the outcome of the promise when they return a promise.

```javascript
new Promise((_, reject) => reject(new Error("Fail")))
  .then(value => console.log("Handler 1:", value))
  .catch(reason => {
    console.log("Caught failure " + reason);
    return "nothing";
  })
  .then(value => console.log("Handler 2:", value));
// → Caught failure Error: Fail
// → Handler 2: nothing
```

The first `then` handler function isn’t called because at that point of the pipeline the promise holds a rejection. The `catch` handler handles that rejection and returns a value, which is given to the second `then` handler function.

Much like an uncaught exception is handled by the environment, JavaScript environments can detect when a promise rejection isn’t handled and will report this as an error.

### Carla and Breaking in

Assume Carla has a joinWifi function. Given the network name and the passcode (as a string), the function tries to join the network, returning a promise that resolves if successful and rejects if the authentication failed. The first thing she needs is a way to wrap a promise so that it automatically rejects after it takes too much time, to allow the program to quickly move on if the access point doesn’t respond.

```javascript
function withTimeout(promise, time) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(() => reject("Timed out"), time);
  });
}
```

This makes use of the fact that a promise can be resolved or rejected only once. If the promise given as its argument resolves or rejects first, that result will be the result of the promise returned by withTimeout. If, on the other hand, the setTimeout fires first, rejecting the promise, any further resolve or reject calls are ignored.

Because you cannot wait for a promise inside a for loop, Carla uses a recursive function to drive this process. On each call, this function gets the code as we know it so far, as well as the next digit to try. Depending on what happens, it may return a finished code or call through to itself, to either start cracking the next position in the code or to try again with another digit.

```javascript
function crackPasscode(networkID) {
  function nextDigit(code, digit) {
    let newCode = code + digit;
    return withTimeout(joinWifi(networkID, newCode), 50)
      .then(() => newCode)
      .catch(failure => {
        if (failure == "Timed out") {
          return nextDigit(newCode, 0);
        } else if (digit < 9) {
          return nextDigit(code, digit + 1);
        } else {
          throw failure;
        }
      });
  }
  return nextDigit("", 0);
}
```

The access point tends to respond to bad authentication requests in about 20 milliseconds, so to be safe, this function waits for 50 milliseconds before timing out a request.

```javascript
crackPasscode("HANGAR 2").then(console.log);
// → 555555
```

Carla tilts her head and sighs. This would have been more satisfying if the code had been a bit harder to guess.

### Async functions

Even with promises, this kind of asynchronous code is annoying to write. Promises often need to be tied together in verbose, arbitrary-looking ways. To create an asynchronous loop, Carla was forced to introduce a recursive function.

The thing the cracking function actually does is completely linear—it always waits for the previous action to complete before starting the next one. In a synchronous programming model, it’d be more straightforward to express.

The good news is that JavaScript allows you to write pseudosynchronous code to describe asynchronous computation. An `async` function implicitly returns a promise and can, in its body, `await` other promises in a way that `looks` synchronous.

We can rewrite crackPasscode like this:

```javascript
async function crackPasscode(networkID) {
  for (let code = "";;) {
    for (let digit = 0;; digit++) {
      let newCode = code + digit;
      try {
        await withTimeout(joinWifi(networkID, newCode), 50);
        return newCode;
      } catch (failure) {
        if (failure == "Timed out") {
          code = newCode;
          break;
        } else if (digit == 9) {
          throw failure;
        }
      }
    }
  }
}
```

This version more clearly shows the double loop structure of the function (the inner loop tries digit 0 to 9 and the outer loop adds digits to the passcode).

An async function is marked by the word async before the function keyword. Methods can also be made async by writing async before their name. When such a function or method is called, it returns a promise. As soon as the function returns something, that promise is resolved. If the body throws an exception, the promise is rejected.

Inside an async function, the word await can be put in front of an expression to wait for a promise to resolve and only then continue the execution of the function. If the promise rejects, an exception is raised at the point of the await.

uch a function no longer runs from start to completion in one go like a regular JavaScript function. Instead, it can be frozen at any point that has an await and can be resumed at a later time.

For most asynchronous code, this notation is more convenient than directly using promises. You do still need an understanding of promises, since in many cases you’ll still interact with them directly. But when wiring them together, async functions are generally more pleasant to write than chains of then calls.