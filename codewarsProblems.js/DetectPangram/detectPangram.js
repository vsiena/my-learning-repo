/* 
https://www.codewars.com/kata/545cedaa9943f7fe7b000048/train/javascript
A pangram is a sentence that contains every single letter of the alphabet at least once. 
For example, the sentence 
"The quick brown fox jumps over the lazy dog" is a pangram, 
because it uses the letters A-Z at least once (case is irrelevant).

Given a string, detect whether or not it is a pangram. 
Return True if it is, False if not. Ignore numbers and punctuation.
*/

/* Set: A Set is used to store unique letters from the string. 
Since Sets automatically handle duplicates, 
you don't have to worry about adding the same letter multiple times.

Size Check: Finally, the function checks if the size of the set is 26, 
meaning all letters of the alphabet are present.
*/

function isPangram(string){
    let storage = new Set();
    for (let i of string.toLowerCase()){
        if (i >= 'a' && i <= 'z'){
            storage.add(i);
        }
    }
    return storage.size === 26;
};

console.log(isPangram("The quick brown fox jumps over the lazy dog"));

// another option

function isPangram(string){
    string = string.toLowerCase();
    return "abcdefghijklmnopqrstuvwxyz".split("").every(function(x){
      return string.indexOf(x) !== -1;
    });
  };