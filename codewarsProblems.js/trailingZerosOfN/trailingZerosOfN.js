/* 
Write a program that will calculate the number of trailing zeros in a factorial of a given number.
For more info, see: http://mathworld.wolfram.com/Factorial.html

Hint: divide by 5 - If decimal rount up.
*/



function zeros (n) {
    if (n % 5 == 0) return n / 5;
    else return Math.round(n / 5)
}

console.log(zeros(12));