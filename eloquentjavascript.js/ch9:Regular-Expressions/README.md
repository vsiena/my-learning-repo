# Chapter notes

### Regular Expressions

Regular expressions are a way to describe patterns in string data. They form a small, separate language that is part of JavaScript and many other languages and systems.

Regular expressions are both terribly awkward and extremely useful. Their syntax is cryptic and the programming interface JavaScript provides for them is clumsy. But they are a powerful tool for inspecting and processing strings. Properly understanding regular expressions will make you a more effective programmer.

### Creating a regular expression

A regular expression is a type of object. It can be either constructed with the `RegExp` constructor or written as a literal value by enclosing a pattern in forward slash (`/`) characters.

```javascript
let re1 = new RegExp("abc");
let re2 = /abc/;
```

Both of those regular expression objects represent the same pattern: an a character followed by a b followed by a c.

When using the `RegExp` constructor, the pattern is written as a normal string, so the usual rules apply for backslashes.

The second notation, where the pattern appears between slash characters, treats backslashes somewhat differently. First, since a forward slash ends the pattern, we need to put a backslash before any forward slash that we want to be part of the pattern. In addition, backslashes that aren’t part of special character codes (like `\n`) will be `preserved`, rather than ignored as they are in strings, and change the meaning of the pattern. Some characters, such as question marks and plus signs, have special meanings in regular expressions and must be preceded by a backslash if they are meant to represent the character itself.

```javascript
let aPlus = /A\+/;
```

### Testing for matches

Regular expression objects have a number of methods. The simplest one is `test`. If you pass it a string, it will return a `Boolean` telling you whether the string contains a match of the pattern in the expression.

```javascript
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false
```

### Sets of characters

Finding out whether a string contains abc could just as well be done with a call to indexOf. Regular expressions are useful because they allow us to describe more complicated patterns.

Say we want to match any number. In a regular expression, putting a set of characters between square brackets makes that part of the expression match any of the characters between the brackets.

Both of the following expressions match all strings that contain a digit:

```javascript
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
```

Within square brackets, a hyphen (`-`) between two characters can be used to indicate a range of characters, where the ordering is determined by the character’s Unicode number. Characters 0 to 9 sit right next to each other in this ordering (codes 48 to 57), so [0-9] covers all of them and matches any digit.

A number of common character groups have their own built-in shortcuts. Digits are one of them: `\d` means the same thing as `[0-9]`.

* `\d`	Any digit character
* `\w`	An alphanumeric character (“word character”)
* `\s`	Any whitespace character (space, tab, newline, and similar)
* `\D`	A character that is not a digit
* `\W`	A nonalphanumeric character
* `\S`	A nonwhitespace character
* `.`	Any character except for newline

You could match a date and time format like `01-30-2003 15:20` with the following expression:

```javascript
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));
// → true
console.log(dateTime.test("30-jan-2003 15:20"));
// → false
```

These backslash codes can also be used inside square brackets. For example, `[\d.]` means any digit or a period character. The period itself, between square brackets, loses its special meaning. The same goes for other special characters, such as the plus sign (`+`).

To invert a set of characters—that is, to express that you want to match any character except the ones in the set—you can write a caret (`^`) character after the opening bracket.

```javascript
let nonBinary = /[^01]/;
console.log(nonBinary.test("1100100010100110"));
// → false
console.log(nonBinary.test("0111010112101001"));
// → true
```

### International characters

