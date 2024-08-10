/*
Build a pyramid-shaped tower, as an array/list of strings, 
given a positive integer number of floors. 
A tower block is represented with "*" character.

For example, a tower with 3 floors looks like this:

[
  "  *  ",
  " *** ", 
  "*****"
]
And a tower with 6 floors looks like this:

[
  "     *     ", 
  "    ***    ", 
  "   *****   ", 
  "  *******  ", 
  " ********* ", 
  "***********"
]
*/



function towerBuilder(nFloors) {
    let tower = [];

    for (let i = 1; i <= nFloors; i++) {
        let block = "*".repeat(2 * i - 1);
        let space = " ".repeat(nFloors - i);
        let lvl = space + block + space; 
        tower.push(lvl);
    }
    return tower;
  }
console.log(towerBuilder(7));