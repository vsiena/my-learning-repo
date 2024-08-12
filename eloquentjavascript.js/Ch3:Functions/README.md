# Chapter notes

### Defining a function

A `function` definition is a reular binding where the `value` of the binding is a `function`. For example, this code defines `square` to refer to a function that produces the square of a given number:
```javascript
const square = function(x) {
  return x * x;
};

console.log(square(12));
// → 144
```
A function is created with an `expression` that starts with the *keyword* `function`. Functions have a set of *parameters* (in this case, only `x`) and a *body*, which contains the statements that are to be `executed when the function is called`. The body of a function created this way must always be wrapped in braces (`{}`), even when it consists of only a single statement.

A function can have `multiple` parameters or `no` parameters at all. In the following example, `makeNoise` does not list any parameter names, whereas `roundTo` (which rounds `n` to the nearest multiple of `step`) lists two:
```javascript
const makeNoise = function() {
  console.log("Pling!");
};

makeNoise();
// → Pling!

const roundTo = function(n, step) {
  let remainder = n % step;
  return n - remainder + (remainder < step / 2 ? 0 : step);
};

console.log(roundTo(23, 10));
// → 20
```

A `return` statement determines the value the function returns. When control comes across such a statement, it immediately jumps out of the current function and gives the returned value to the code that called the function. A `return` keyword `without` an expression after it will cause the function to return `undefined`. Functions that don’t have a return statement at all, such as `makeNoise`, similarly return `undefined`.

Parameters to a function behave like regular *bindings*, but their initial values are given by the `caller` of the function, not the code in the function itself.

### Nested scope
```javascript
const hummus = function(factor) {
  const ingredient = function(amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};
```

### Declaration notation

There is a slightly shorter way to create a function binding. When the `function` keyword is used at the start of a statement, it works differently:
```javascript
function square(x) {
  return x * x;
}
```
This is a `function declaration`. Function declarations are not part of the regular top-to-bottom flow of control. They are conceptually moved to the top of their scope and can be used by all the code in that scope.

### Arrow functions

Instead of the function keyword, it uses an arrow `(=>)`. 
```javascript
const roundTo = (n, step) => {
  let remainder = n % step;
  return n - remainder + (remainder < step / 2 ? 0 : step);
};
```
The arrow comes after the list of parameters and is followed by the function’s body. It expresses something like “this input (the parameters) produces this result (the body)”.

### Optional Arguments

The following code is allowed and executes without any problem:
```javascript
function square(x) { return x * x; }
console.log(square(4, true, "hedgehog"));
// → 16
```

If you write an = operator after a parameter, followed by an expression, the value of that expression will replace the argument when it is not given. For example, this version of roundTo makes its second argument optional. If you don’t provide it or pass the value undefined, it will default to one:
```javascript
function roundTo(n, step = 1) {
  let remainder = n % step;
  return n - remainder + (remainder < step / 2 ? 0 : step);
};

console.log(roundTo(4.5));
// → 5
console.log(roundTo(4.5, 2));
// → 4
```

### Recursion