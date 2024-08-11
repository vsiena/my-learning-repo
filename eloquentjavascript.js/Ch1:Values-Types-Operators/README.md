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

```
"A newline character is written like \"\\n\"."
```

Strings written with single or double quotes behave very much the same—the only difference lies in which type of quote you need to escape inside of them. Backtick-quoted strings, usually called template literals, can do a few more tricks. Apart from being able to span lines, they can also embed other values.

```
`half of 100 is ${100 / 2}`
```

When you write something inside ${} in a template literal, its result will be computed, converted to a string, and included at that position. This example produces the string "half of 100 is 50".

