/* 

The previous chapter introduced the standard function Math.min 
that returns its smallest argument. We can write a function 
like that ourselves now. Define the function min that takes two 
arguments and returns their minimum.

*/

function min(a, b){
    if (a < b){
        return a;
    } else {
        return b;
    }
}

const minArrowFunction = (a, b) => {
    return a < b ? a : b
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

console.log(minArrowFunction(0, 10));
// → 0
console.log(minArrowFunction(0, -10));
// → -10

