# Chapter Notes

### Expressions and statements

A fragment of code that produces an `value` is called an `expression`. If an `expression` corresponds to a `sentence fragment`, a `JavaScript statement` corresponds to a `full sentence`. A `program` is a `list of statements`.

The simplest kind of `statement` is an `expression` with a semicolon after it.

```javascript
1;
!false;
```

### Bindings

To catch and hold values, JavaScript provides a thing called a `binding`, or `variable`.

```javascript
let caught = 5 * 5;
```
That gives us a second kind of statement. The special word `(keyword)` `let` indicates that this sentence is going to define a binding. It is followed by the name of the binding and, if we want to immediately give it a value, by an `=` operator and an `expression`.

The example creates a `binding` called `caught` and uses it to grab hold of the number that is produced by multiplying 5 by 5.

```javascript
let ten = 10;
console.log(ten * ten); 
// → 100
```

A single let statement may define multiple bindings. The definitions must be separated by commas:

```javascript
let one = 1, two = 2;
console.log(one + two);
// → 3
```

### Functions

A lot of the `values` provided in the default `environment` have the type `function`. A `function` is a piece of program wrapped in a `value`.

Executing a function is called `invoking`, `calling`, or `applying` it. You can `call a function` by putting `parentheses` after an `expression` that produces a `function value`.

`Values` given to `function`s are called `arguments`. Different functions might need a different number or different types of arguments.

### Return values

When a function produces a value, it is said to `return` that value. 

### Control flow

When your program contains more than one statement, the statements are executed as though they were a story, from top to bottom.

```javascript
let theNumber = Number(prompt("Pick a number"));
console.log("Your number is the square root of " +
            theNumber * theNumber);
```

### Conditional execution

We may, for example, want to create a branching road where the program takes the proper branch based on the situation at hand. This is called conditional execution.

```javascript
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
}
```
The `Number.isNaN` function is a standard JavaScript function that returns `true` only if the argument it is given is `NaN`. The `Number` function happens to return `NaN` when you give it a string that doesn’t represent a valid number. Thus, the condition translates to `“unless theNumber is not-a-number, do this”`.

* `if`
* `else if`
* `else`

### While and do loops

A `loop` is a form of a control flow.

```javascript
let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
// → 0
// → 2
//   … etcetera
```

A `do` loop is a control structure similar to a while loop. It differs only on one point: a `do` loop always executes its body at least once, and it `starts testing whether it should stop only after that first execution`. To reflect this, the test appears after the body of the loop:

```javascript
let yourName;
do {
  yourName = prompt("Who are you?");
} while (!yourName);
console.log("Hello " + yourName);
```
This program will `force you to enter a name`. It will ask again and again until it gets something that is `not an empty string`. Applying the `!` operator will convert a value to `Boolean type` before negating it, and all strings except `""` convert to `true`. This means the loop continues going round until you provide a non-empty name.

### For loops

Because this pattern is so common, JavaScript and similar languages provide a slightly shorter and more comprehensive form, the for loop:

```javascript
for (let number = 0; number <= 12; number = number + 2) {
  console.log(number);
}
// → 0
// → 2
//   … etcetera
```

### Breaking Out of a Loop

The `break` statement has the effect of immediately jumping out of the enclosing loop. 

```javascript
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
// → 21
```
Using the remainder `(%)` operator is an easy way to test whether a number is divisible by another number. If it is, the remainder of their division is zero.

The `continue` keyword is similar to `break` in that it influences the progress of a loop. When `continue` is encountered in a loop body, control jumps out of the body and continues with the loop’s next iteration.

### Updating bindings succinctly

* counter = counter + 1;
* counter += 1;

For counter += 1 and counter -= 1, there are even shorter equivalents:

* counter++
* counter-- 
