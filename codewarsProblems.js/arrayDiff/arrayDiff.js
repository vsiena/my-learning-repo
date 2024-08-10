/* 

https://www.codewars.com/kata/523f5d21c841566fde000009/train/javascript

Your goal in this kata is to implement a difference function, 
which subtracts one list from another and returns the result.

It should remove all values from list a, 
which are present in list b keeping their order.

If a value is present in b, all of its occurrences must be removed from the other:
// filter through items in a to see if b is present. If true, they are exluded from array. 

*/

function arrayDiff(a, b) {
    return a.filter(element => !b.includes(element));
};

console.log(arrayDiff([1,2],[1]));
// arrayDiff([1,2],[1]) == [2]

console.log(arrayDiff([1,2,2,2,3],[2]));
// arrayDiff([1,2,2,2,3],[2]) == [1,3]


console.log(arrayDiff([1,2,3], [1,2]));
// console.log(arrayDiff([1,2,3], [1,2])) == [3]