/* Write an algorithm that takes an array and moves all of the zeros to the end, 
preserving the order of the other elements.
*/



function moveZeros(arr) {
    let nonZeros = arr.filter(item => item !== 0 );
    let zeros = arr.filter(item => item === 0 );
    return nonZeros.concat(zeros);
  };


  console.log(moveZeros([false,1,0,1,2,0,1,3,"a"])) // returns[false,1,1,2,1,3,"a",0,0]