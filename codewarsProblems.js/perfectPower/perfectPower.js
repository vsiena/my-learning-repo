/*
A perfect power is a classification of positive integers:

In mathematics, a perfect power is a positive integer that can be 
expressed as an integer power of another positive integer. 
More formally, n is a perfect power if there exist natural numbers m > 1, and k > 1 such that mk = n.

Your task is to check wheter a given integer is a perfect power. 
If it is a perfect power, return a pair m and k with mk = n as a proof. 
Otherwise return Nothing, Nil, null, NULL, None or your language's equivalent.
*/

var isPP = function(n) {
    for (let k = 2; k <= Math.log2(n); k++) {
        let m = Math.round(Math.pow(n, 1 / k));  // Find the approximate value of m
        if (Math.pow(m, k) === n) {  // Check if m^k equals n
            return [m, k];  // Return the pair [m, k] if n is a perfect power
        }
    }
    return null;  // Return null if no perfect power is found
};


// Other solution

function isPP(n) {
    for (var m = 2; m * m <= n; ++ m)
      for (var k = 2; Math.pow(m, k) <= n; ++ k)
        if (Math.pow(m, k) == n) return [m, k];
    return null;
  }