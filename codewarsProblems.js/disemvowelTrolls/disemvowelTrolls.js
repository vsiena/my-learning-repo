/* Your task is to write a function that takes a string and return a new string with all vowels removed.

For example, the string "This website is for losers LOL!" would become "Ths wbst s fr lsrs LL!".

*/

function disemvowel(str) {
    return str.replace(/[aeiouAEIOU]/g, '');
  }

console.log(disemvowel("hello how are you"));
// hll hw r y