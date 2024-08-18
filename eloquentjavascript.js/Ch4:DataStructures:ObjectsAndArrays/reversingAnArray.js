/* 

Arrays have a reverse method that changes 
the array by inverting the order in which its elements appear. 
For this exercise, write two functions, reverseArray and reverseArrayInPlace. 
The first, reverseArray, should take an array as its argument and produce a 
new array that has the same elements in the inverse order. 
The second, reverseArrayInPlace, should do what the reverse method does: 
modify the array given as its argument by reversing its elements. Neither may use the standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous chapter, 
which variant do you expect to be useful in more situations? Which one runs faster?

Hint for reverseArrayInPlace: 
The trick is to swap the first and last elements, then the second and second-to-last, and so on. 
You can do this by looping over half the length of the array 
(use Math.floor to round down—you don’t need to touch the middle element in an array with an odd number of elements) 
and swapping the element at position i with the one at position array.length - 1 - i. 
You can use a local binding to briefly hold onto one of the elements, 
overwrite that one with its mirror image, and then put the value 
from the local binding in the place where the mirror image used to be.

*/

// Your code here.
function reverseArray(array){
    let newArray = [];
    for (let n of array) {
        newArray.unshift(n);
    } 
    return newArray;
}

function reverseArrayInPlace(array){
    for (let i = 0; i < Math.floor(array.length / 2); i++){
        let tempBind = array[i];
        array[i] = array[(array.length - 1) - i];
        array[(array.length - 1) - i] = tempBind;
    }
    return array;
}

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"];
console.log(myArray);
// → ["A", "B", "C"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
