/*
Write a class Vec that represents a vector in two dimensional space. 
It take x and y parameters (numbers), that saves to properties 
of the same name.

Give the Vec prototype two methods, plus and minus, 
that take another vector as a parameter
and return a new vector that has the sum of difference 
of the two vectors' 
(this and the parameter) x and y values. 

Add a getter property length to the protoype that 
computes the length of the vector that is, 
the distance of the point (x,y) from the origin (0,0). 
*/

/*
Hint: 
Look back to the Rabbit class ex if you're 
unsure how class delerations look.
To compute the distance from (0,0) to (x, y), 
you can use the Pythagorean theorem.
*/

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// -> Vec{z: 3, y: 5};
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// -> Vec{z: -1, y: -1};
console.log(new Vec(3, 4).length);
// -> 5