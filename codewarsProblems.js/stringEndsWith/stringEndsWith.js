// Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string).
function solution(str, ending){
  if (str.endsWith(ending)) {
    return true
  } else {
    return false
  }
}

console.log(solution('abc', 'bc')) // returns true
console.log(solution('abc', 'd')) // returns false


// another way to write

function solution(str, ending){
  return str.endsWith(ending);
}
console.log(solution('abc', 'bc')) // returns true
console.log(solution('abc', 'd')) // returns false