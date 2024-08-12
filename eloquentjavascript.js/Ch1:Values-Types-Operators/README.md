# Chapter Notes

### Special Numbers
There are three special values in JavaScript that are considered numbers but don’t behave like normal numbers.
* Infinity
* -Infinity
* NaN (not a number)

### Strings
You can use single quotes, double quotes, or backticks to mark strings, as long as the quotes at the start and the end of the string match.

Newlines (the characters you get when you press enter) can be included only when the string is quoted with backticks (`). To make it possible to include such characters in a string, the following notation is used: a backslash ( \ ) inside quoted text indicates that the character after it has a special meaning. This is called escaping the character. A quote that is preceded by a backslash will not end the string but be part of it. When an n character occurs after a backslash, it is interpreted as a newline. Similarly, a t after a backslash means a tab character. Take the following string:

"This is the first line\nAnd this is the second"  

This is the actual text in that string:

This is the first line  
And this is the second

There are, of course, situations where you want a backslash in a string to be just a backslash, not a special code. If two backslashes follow each other, they will collapse together, and only one will be left in the resulting string value. This is how the string “A newline character is written like "\n".” can be expressed:

```javascript
"A newline character is written like \"\\n\"."
```

Strings written with single or double quotes behave very much the same—the only difference lies in which type of quote you need to escape inside of them. Backtick-quoted strings, usually called template literals, can do a few more tricks. Apart from being able to span lines, they can also embed other values.

```javascript
`half of 100 is ${100 / 2}`
```

When you write something inside ${} in a template literal, its result will be computed, converted to a string, and included at that position. This example produces the string "half of 100 is 50".

### Unary operators

`typeof` operator produces a string value naming the type of the value you give it.

```javascript
console.log(typeof 4.5) // → number
console.log(typeof "x") // → string
```

### Boolean values 
JavaScript has a Boolean type, which has just two values, true and false, written as those words.

### Logical operators
JavaScript supports three logical operators: `and`, `or`, and `not`. These can be used to “reason” about Booleans.

The `&&` operator represents logical `and`. It is a binary operator, and its result is `true` only if both the values given to it are true.

```javascript
console.log(true && false) // → false
console.log(true && true) // → true
```

The `||` operator denotes logical or. It produces `true` if either of the values given to it is `true`.

```javascript
console.log(false || true) // → true
console.log(false || false) // → false
```

`Not` is written as an exclamation mark `(!)`. It is a unary operator that flips the value given to it—`!true` produces `false` and `!false` gives `true`.

The last logical operator we will look at is not unary, not binary, but `ternary`, operating on `three` values. It is written with a `question mark` and a `colon`, like this:

```javascript
console.log(true ? 1 : 2); // → 1
console.log(false ? 1 : 2); // → 2
```

The operator uses the value to the left of the question mark to decide which of the two other values to “pick”. If you write `a ? b : c`, the result will be `b` when `a` is `true` and `c` otherwise.

### Empty values

There are two special values, written `null` and `undefined`that are used to denote the absence of a meaningful value. They are themselves values, but they carry no information.

### Short-Circuiting of logical operators

The `||` operator, for example, will return the value to its `left` when that value can be converted to `true` and will return the value on its `right` otherwise.

```javascript
console.log(null || "user") // → user
console.log("Agnes" || "user") // → Agnes
```
The rules for converting `strings` and `numbers` to `Boolean values` state that `0`, `NaN`, and the empty string `("")` count as `false`, while all the other values count as `true`. That means `0 || -1` produces `-1`, and `"" || "!?"` yields `"!?"`.

The `??` operator resembles `||` but returns the value on the right `only` if the one on the left is `null` or `undefined`, not if it is some other value that can be converted to false. Often, this is preferable to the behavior of `||`.

``` javascript
console.log(0 || 100); // → 100
console.log(0 ?? 100); // → 0
console.log(null ?? 100); // → 100
```

When the value to its `left` is something that converts to `false`, it returns that value, and otherwise it returns the value on its right.

