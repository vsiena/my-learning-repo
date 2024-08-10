var isSquare = function(n) {
    let root = Math.sqrt(n);
    let rootClean = Math.floor(root);
    return rootClean * rootClean === n;
  };
  console.log(isSquare(99));
  // false