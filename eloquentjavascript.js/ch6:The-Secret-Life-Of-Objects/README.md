# Chapter notes

### Abstract data types

The main idea in object-oriented programming is to use objects, or rather types of objects, as the unit of program organization.

An abstract data type, or object class, is a subprogram that may contain arbitrarily complicated code but exposes a limited set of methods and properties that people working with it are supposed to use.

### Methods

```javascript 
function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my fur and whiskers");
// → The white rabbit says 'Oh my fur and whiskers'
hungryRabbit.speak("Got any carrots?");
// → The hungry rabbit says 'Got any carrots?'
```
When a function is called as a method—looked up as a property and immediately called, as in `object.method()`—the binding called `this` in its body automatically points at the object on which it was called.

If you want to provide it explicitly, you can use a function’s call method, which takes the this value as its first argument and treats further arguments as normal parameters.

```javascript
speak.call(whiteRabbit, "Hurry");
// → The white rabbit says 'Hurry'
```

Arrow functions are different—they do not bind their own this but can see the this binding of the scope around them. Thus, you can do something like the following code, which references this from inside a local function:

```javascript
let finder = {
  find(array) {
    return array.some(v => v == this.value);
  },
  value: 5
};
console.log(finder.find([4, 5]));
// → true
```
A property like `find(array)` in an object expression is a shorthand way of defining a method. It creates a property called `find` and gives it a function as its value.

### Prototypes

One way to create a rabbit object type with a `speak` method would be to create a helper function that has a rabbit type as its parameter and returns an object holding that as its `type` property and our speak function in its `speak` property.

In JavaScript, `prototypes` are the way to do that. Objects can be linked to other objects, to magically get all the properties that other object has. Plain old objects created with `{}` notation are linked to an object called `Object.prototype`.

```javascript
let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]
```
It looks like we just pulled a property out of an empty object. But in fact, `toString` is a method stored in `Object.prototype`, meaning it is available in most objects.

```javascript
console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null
```

As you’d guess, `Object.getPrototypeOf` returns the prototype of an object.

`Functions` derive from `Function.prototype` and `arrays` derive from `Array.prototype`.

```javascript
console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) == Array.prototype);
// → true
```

You can use `Object.create` to create an object with a specific prototype.
```javascript
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");
// → The black rabbit says 'I am fear and darkness'
```
The “proto” rabbit acts as a container for the properties shared by all rabbits. An individual rabbit object, like the black rabbit, contains properties that apply only to itself—in this case its type—and derives shared properties from its prototype.

### Classes

A `class` defines the shape of a type of object—what methods and properties it has. Such an object is called an `instance` of the class.

Prototypes are useful for defining properties for which `all instances of a class share the same value`. Properties that differ per instance, such as our rabbits’ type property, need to be stored directly in the objects themselves.

To create an instance of a given class, you have to make an object that derives from the proper prototype, but you also have to make sure it itself has the properties that instances of this class are supposed to have. This is what a `constructor` function does.

```javascript 
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}
```
JavaScript’s `class notation` makes it easier to define this type of function, along with a prototype object.

```javascript
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
```
The `class` keyword starts a `class declaration`, which allows us to define a `constructor` and a set of methods together. Any number of methods may be written inside the declaration’s braces. This code has the effect of defining a binding called `Rabbit`, which holds a function that runs the code in `constructor` and has a `prototype` property that holds the `speak` method.

This function cannot be called like a normal function. Constructors, in JavaScript, are called by putting the keyword `new` in front of them. Doing so creates a fresh instance object whose prototype is the object from the function’s prototype property, then runs the function with this bound to the new object, and finally returns the object.

```javascript
let killerRabbit = new Rabbit("killer");
```

By convention, the names of constructors are `capitalized` so that they can easily be distinguished from other functions.

It is important to understand the distinction between the way a prototype is associated with a constructor (through its prototype property) and the way objects have a prototype (which can be found with `Object.getPrototypeOf`). The actual prototype of a constructor is `Function.prototype` since constructors are functions. The constructor function’s prototype property holds the prototype used for instances created through it.

```javascript
console.log(Object.getPrototypeOf(Rabbit) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf(killerRabbit) ==
            Rabbit.prototype);
// → true
```

### Private Properties

To declare a private method, put a `#` sign in front of its name. Such methods can be called only from inside the `class` declaration that defines them.

```javascript
class SecretiveObject {
  #getSecret() {
    return "I ate all the plums";
  }
  interrogate() {
    let shallISayIt = this.#getSecret();
    return "never";
  }
}
```

### Overriding derived properties

### Maps

A `map` (noun) is a data structure that associates values (the keys) with other values. For example, you might want to map names to ages. It is possible to use objects for this.

```javascript
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};

console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true
```
Here, the object’s property names are the people’s names and the property values are their ages. But we certainly didn’t list anybody named toString in our map. Yet because plain objects derive from `Object.prototype`, it looks like the property is there.

For this reason, using plain objects as maps is dangerous. There are several possible ways to avoid this problem. First, you can create objects with no prototype. If you pass null to Object.create, the resulting object will not derive from Object.prototype and can be safely used as a map.
```javascript
console.log("toString" in Object.create(null));
// → false
```
Object property names must be strings. If you need a map whose keys can’t easily be converted to strings—such as objects—you cannot use an object as your map.

Fortunately, JavaScript comes with a class called `Map` that is written for this exact purpose. It stores a mapping and allows any type of keys.
```javascript
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false
```
The methods `set`, get, and `has` are part of the interface of the Map object. Writing a data structure that can quickly update and search a large set of values isn’t easy, but we don’t have to worry about that. Someone else did it for us, and we can go through this simple interface to use their work.

If you do have a plain object that you need to treat as a map for some reason, it is useful to know that Object.keys returns only an object’s own keys, not those in the prototype. As an alternative to the in operator, you can use the Object.hasOwn function, which ignores the object’s prototype.

```javascript
console.log(Object.hasOwn({x: 1}, "x"));
// → true
console.log(Object.hasOwn({x: 1}, "toString"));
// → false
```

### Polymorphism

### Getters, setters, and statics

Interfaces often contain plain properties, not just methods. For example, Map objects have a size property that tells you how many keys are stored in them.

It is not necessary for such an object to compute and store such a property directly in the instance. Even properties that are accessed directly may hide a method call. Such methods are called getters and are defined by writing get in front of the method name in an object expression or class declaration.

```javascript
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};

console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49
```

Whenever someone reads from this object’s `size` property, the associated method is called. You can do a similar thing when a property is written to, using a `setter`.

```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
```