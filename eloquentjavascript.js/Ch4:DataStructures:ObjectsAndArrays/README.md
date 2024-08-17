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

`Properties` that contain `functions` are generally called `methods` of the `value` they belong to, as in “`toUpperCase` is a `method` of a `string”`.

This example demonstrates two methods you can use to manipulate arrays.

```javascript
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
```

### Objects

Values of the type object are arbitrary collections of properties. One way to create an object is by using braces as an expression.

```javascript
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false
```
To find out what `properties` an `object` has, you can use the `Object.keys` function. Give the function an object and it will return an array of strings—the object’s property names:

```javascript
console.log(Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]
```
There’s an `Object.assign` function that `copies` all properties from one object into another:
```javascript
let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);
// → {a: 1, b: 3, c: 4}
```
### Mutability

Objects work differently. You can change their properties, causing a single object value to have different content at different times.

When we have two numbers, 120 and 120, we can consider them precisely the same number, whether or not they refer to the same physical bits. With objects, there is a difference between having two references to the same object and having two different objects that contain the same properties. Consider the following code:

```javascript
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false

object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10
```

A `const` binding to an object can itself not be changed and will continue to point at the same object, the `contents` of that object might change.
```javascript
const score = {visitors: 0, home: 0};
score.visitors = 1; // This is okay
score = {visitors: 1, home: 1}; // This isn't allowed
```

When you compare objects with JavaScript’s `==` operator, it compares by `identity`: it will produce `true` only if both objects are precisely the same value. Comparing different objects will return `false`, even if they have identical properties. There is no “deep” comparison operation built into JavaScript that compares objects by contents.

### The lycanthrope’s log

`Correlation` between variables is usually expressed as a value that ranges `from -1 to 1`. `Zero correlation` means the variables are `not related`. A `correlation of 1` indicates that the two are `perfectly related`—if you know one, you also know the other. `Negative 1` also means that the variables are perfectly related but are `opposites`—when one is true, the other is false.

![alt text](https://eloquentjavascript.net/img/pizza-squirrel.svg)

`[01, 00, 10, 11]`

### Computing correlation

We’ll interpret the indices to the array as two-bit binary numbers, where the leftmost (most significant) digit refers to the squirrel variable and the rightmost (least significant) digit refers to the event variable. For example, the binary number 10 refers to the case where Jacques did turn into a squirrel, but the event (say, “pizza”) didn’t occur. This happened four times. And since binary 10 is 2 in decimal notation, we will store this number at index 2 of the array.

```javascript
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]
```
Arrays have an `includes` method that checks whether a given value exists in the array. The function uses that to determine whether the event name it is interested in is part of the event list for a given day.

The body of the loop in `tableFor` figures out which box in the table each journal entry falls into by checking whether the entry contains the specific event it’s interested in and whether the event happens alongside a squirrel incident. The loop then adds one to the correct box in the table.

We now have the tools we need to compute individual correlations. The only step remaining is to find a correlation for every type of event that was recorded and see whether anything stands out

### Array loops

In the tableFor function, there’s a loop like this:
```javascript
for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Do something with entry
}
```
There is a simpler way to write such loops in modern JavaScript:
```javascript
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}
```
When a `for loop` uses the word `of` after its variable definition, it will loop over the elements of the value given after `of`. This works not only for arrays but also for strings and some other data structures.

### Further arrayology

We saw `push` and `pop`, which `add` and `remove` elements at the `end` of an array, earlier in this chapter. The corresponding methods for `adding` and `removing` things at the `start` of an array are called `unshift` and `shift`.

```javascript
let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}
```
To search for a specific value, arrays provide an `indexOf` method. The method searches through the array from the `start` to the `end` and returns the index at which the requested value was found—or `-1` if it `wasn’t found`. To `search from the end` instead of the start, there’s a similar method called `lastIndexOf`:
```javascript
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
```
Both `indexOf` and `lastIndexOf` take an optional second argument that indicates where to start searching.

Another fundamental array method is `slice`, which takes `start and end indices` and `returns` an array that `has only the elements between them`. The start index is inclusive and the end index is exclusive.
```javascript
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]
```

When the `end` index is `not given`, `slice` will take all of the elements after the start index. You can also omit the start index to copy the entire array.

The `concat` method can be used to append arrays together to create a new array, similar to what the + operator does for strings.

The following example shows both `concat` and `slice` in action. It takes an `array` and an `index` and returns a new array that is a copy of the original array with the element at the given index removed:

```javascript
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]
```

### Strings and their properties

Every `string` value has a number of `methods`. Some very useful ones are `slice` and `indexOf`, which resemble the array methods of the same name:

```javascript
console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5
```
The `trim` method `removes whitespace` (spaces, newlines, tabs, and similar characters) from the `start` and `end` of a `string`:

```javascript
console.log("  okay \n ".trim());
// → okay
```

The zeroPad function from the previous chapter also exists as a method. It is called `padStart` and takes the `desired length` and `padding` character as `arguments`:
```javascript 
console.log(String(6).padStart(3, "0"));
// → 006
```
You can `split` a string on every occurrence of another string with `split` and `join` it again with `join`:

```javascript
let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping
```
A string can be repeated with the repeat method, which creates a new string containing multiple copies of the original string, glued together:

```javascript
console.log("LA".repeat(3));
// → LALALA
```

### Rest parameters

It can be useful for a function to accept any number of arguments. For example, `Math.max` computes the maximum of all the arguments it is given. To write such a `function`, you `put three dots before` the function’s last parameter, like this:

```javascript
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9
```
When such a function is called, the `rest parameter` is bound to an array containing all further arguments. If there are other parameters before it, their values aren’t part of that array. When, as in `max`, it is the only parameter, it will `hold all arguments`.

You can use a similar three-dot notation to `call` a `function` with an `array of arguments`.

```javascript
let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7
```
This `“spreads”` out the array into the function call, passing its elements as separate arguments. It is possible to include an array like that along with other arguments, as in `max(9, ...numbers, 2)`.

Square bracket array notation similarly allows the triple-dot operator to spread another array into the new array:

```javascript
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]
```

This works even in `curly brace objects`, where it adds all properties from another object. If a property is added multiple times, the `last value to be added wins`:

```javascript
let coordinates = {x: 10, y: 0};
console.log({...coordinates, y: 5, z: 1});
// → {x: 10, y: 5, z: 1}
```

### The Math object

`Math.random`. This is a function that returns a new pseudorandom number between `0` (inclusive) and `1` (exclusive) every time you call it:

If we want a `whole random number` instead of a fractional one, we can use `Math.floor` (which rounds down to the nearest whole number) on the result of `Math.random`:

```javascript
console.log(Math.floor(Math.random() * 10));
// → 2
```

There are also the functions `Math.ceil` (for “ceiling”, which `rounds up to a whole number`), `Math.round` (to the nearest whole number), and `Math.abs`, which takes the `absolute value` of a number, meaning it negates negative values but leaves positive ones as they are.

### Destructuring

Let’s return to the phi function for a moment.

```javascript
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
```
We’d much prefer to have bindings for the `elements` of the array—that is, let `n00 = table[0]` and so on. Fortunately, there is a succinct way to do this in JavaScript:

```javascript
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}
```
A similar trick works for `objects`, using `braces` instead of square brackets.

```javascript
let {name} = {name: "Faraji", age: 23};
console.log(name);
// → Faraji
```

### Optional property access

When you aren’t sure whether a given `value` produces an `object`, but still want to read a property from it when it does, you can use a variant of the dot notation: `object?. ` property.

```javascript
function city(object) {
  return object.address?.city;
}
console.log(city({address: {city: "Toronto"}}));
// → Toronto
console.log(city({name: "Vera"}));
// → undefined
```
The expression `a?.b` means the same as `a.b` when `a` isn’t `null` or `undefined`. When it is, it evaluates to undefined. This can be convenient when, as in the example, you aren’t sure that a given property exists or when a variable might hold an undefined value.

A similar notation can be used with `square bracket access`, and even with `function calls`, by putting `?.` in `front` of the parentheses or brackets:
```javascript
console.log("string".notAMethod?.());
// → undefined
console.log({}.arrayProp?.[0]);
// → undefined
```

### JSON

All property names have to be surrounded by double quotes, and only simple data expressions are allowed—no function calls, bindings, or anything that involves actual computation.

JavaScript gives us the functions JSON.stringify and JSON.parse to convert data to and from this format. The first takes a JavaScript value and returns a JSON-encoded string. The second takes such a string and converts it to the value it encodes:

```javascript
let string = JSON.stringify({squirrel: false, events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
```