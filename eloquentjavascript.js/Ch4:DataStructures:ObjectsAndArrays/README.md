# Chapter Notes

### The weresquirrel

### Datasets

JavaScript provides a `data type` specifically for `storing sequences of values`. It is called an `array` and is written as a list of values between square brackets `[]`, separated by `commas`.

```javascript
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3
```
The notation for getting at the elements inside an array also uses square brackets `[]`. A pair of square brackets `immediately after an expression`, with another `expression inside of them`, will look up the element in the left-hand expression that corresponds to the `index` given by the expression in the brackets.

### Properties

The two main ways to access `properties` in JavaScript are with a `dot` and with `square brackets`. Both `value.x` and `value[x]` access a `property` on value— *but not necessarily the same property*. The difference is in `how` x is interpreted. When using a `dot`, the word after the dot is the literal name of the property. When using `square brackets`, the expression between the brackets is `evaluated` to get the property name. Whereas `value.x` fetches the property of value named `“x”`, `value[x]` takes the value of the variable named `x` and uses that, converted to a string, as the property name.

Just like strings, `arrays` have a `length` property that tells us how many `elements` the array has.

### Methods




