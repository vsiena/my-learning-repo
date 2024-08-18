# Chapter notes

### Abstraction

`Abstractions` give us the ability to talk about problems a at higher (or more abstract) level, without getting sidetracked by uniteresting details.

### Abstracting repetition

Progression of `"doing something N times"`.
```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```
```javascript
function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
```
```javascript
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// → 0
// → 1
// → 2
```
```javascript
let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
```

### Higher-order functions

Functions that operate on other functions, either by taking them as arguments or by returning them, are called `higher-order functions`.

Higher-order functions allow us to abstract over `actions`, not just values. They come in several forms. For example, we can have functions that create new functions.

```javascript
function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true
```

We can also have functions that change other functions.

```javascript
function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1
```

We can even write functions that provide new types of control flow.

```javascript
function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2 == 1, () => {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even
```

There is a built-in array method, `forEach`, that provides something like a `for/of` loop as a higher-order function.

```javascript
["A", "B"].forEach(l => console.log(l));
// → A
// → B
```

### Filtering arrays

Filter the datasets that are still in use.

```javascript
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]
```

Like `forEach`, `filter` is a standard array method. The example defined the function only to show what it does internally. From now on, we’ll use it like this instead:

```javascript
console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// → [{name: "Mongolian", …}, …]
```

### Transforming with map

The `map` method transforms an array by applying a function to all of its elements and building a `new` array from the returned values. The new array will `have the same length as the input array`, but its content will have been `mapped` to a new form by the function.

```javascript 
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", …]
```

### Summarizing with reduce

Another common thing to do with arrays is to compute a single value from them. The higher-order operation that represents this pattern is called `reduce` (sometimes also called fold).

The parameters to `reduce` are, apart from the array, a combining function and a start value. This function is a little less straightforward than filter and map, so take a close look at it:

```javascript
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```
If your array contains at least one element, you are allowed to leave off the start argument. The method will take the first element of the array as its start value and start reducing at the second element.

```javascript
console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10
```
To use reduce (twice) to find the script with the most characters, we can write something like this:

```javascript
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}
```

### Composability

Let’s write code that finds the average year of origin for living and dead scripts in the dataset.

```javascript
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));
// → 1165
console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 204
```

### Strings and character codes

One interesting use of this dataset would be figuring out what script a piece of text is using.

Given a character code, we could use a function like this to find the corresponding script (if any):
```javascript
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latin", …}
```
The `some` method is another higher-order function. It takes a test function and tells you whether that function returns `true` for any of the elements in the array.

### Recognizing text

We have a `characterScript` function and a way to correctly loop over characters. The next step is to `count` the `characters` that belong to each script. The following counting abstraction will be useful there:

```javascript
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find(c => c.name == name);
    if (!known) {
      counts.push({name, count: 1});
    } else {
      known.count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]
```
The `countBy` function expects a collection (anything that we can loop over with `for/of`) and a function that computes a group name for a given element. It returns an array of objects, each of which names a group and tells you the number of elements that were found in that group.

It uses another array method, `find`, which goes over the elements in the array and returns the first one for which a function returns `true`. It returns `undefined` when it finds no such element.

Using `countBy`, we can write the function that tells us which scripts are used in a piece of text.

```javascript
function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic
```
The function first counts the characters by name, using `characterScript` to assign them a name and falling back to the string "none" for characters that aren’t part of any script. The `filter` call drops the entry for "none" from the resulting array, since we aren’t interested in those characters.

To be able to compute percentages, we first need the total number of characters that belong to a script, which we can compute with `reduce`. If we find no such characters, the function returns a specific string. Otherwise, it transforms the counting entries into readable strings with map and then combines them with `join`.