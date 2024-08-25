/*
To create an instance of a given class, 
you have to make an object that derives from the proper prototype, 
but you also have to make sure it itself has the properties that instances of this class are supposed to have. 
This is what a constructor function does.

*/

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

// JavaScript’s class notation makes it easier to define this type of function, along with a prototype object.


class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

/* The class keyword starts a class declaration, 
which allows us to define a constructor and a set of methods together. 
Any number of methods may be written inside the declaration’s braces. 
This code has the effect of defining a binding called Rabbit, 
which holds a function that runs the code in constructor and has a prototype property that holds the speak method.

This function cannot be called like a normal function. 
Constructors, in JavaScript, are called by putting the keyword new in front of them. 
Doing so creates a fresh instance object whose prototype is the object 
from the function’s prototype property, then runs the function with this bound to the new object, 
and finally returns the object.
*/

let killerRabbit = new Rabbit("killer");
