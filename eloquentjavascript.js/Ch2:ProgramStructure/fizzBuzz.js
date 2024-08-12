/* 
Write a program that uses console.log to print all the numbers from 1 to 100, 
with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, 
and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz" 
for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" 
for numbers divisible by only one of those).
*/

// part one
for (let i = 1; i <= 100; i++) {
    if (i % 3 !== 0 && i % 5 == 0) {
        console.log("Buzz");
    } else if (i % 3 == 0 && i % 5 == 0){
        console.log("FizzBuzz")
    } else if (i % 3 == 0){
        console.log("Fizz");
    } else {
        console.log(i);
    }
}

/* For the clever solution, 
build up a string containing the word or words 
to output and print either this word or 
the number if there is no word, potentially 
by making good use of the || operator.

*/
// part two

for (let i = 1; i <= 100; i++){
    let word = "";
    if (i % 3 == 0) word += "Fizz";
    if (i % 5 == 0) word += "Buzz";
    console.log(word || i)
}