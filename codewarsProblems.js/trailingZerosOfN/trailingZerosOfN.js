/* 
Write a program that will calculate the number of trailing zeros in a factorial of a given number.
For more info, see: http://mathworld.wolfram.com/Factorial.html

Hint: divide by 5 - If decimal rount up.
*/



function zeros(n) {
    var result = 0;
    while (n = Math.floor(n / 5)) result += n;
    return result;
}

console.log(zeros(30));