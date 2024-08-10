function narcissistic(value) {
    // turn input to string
    let valueToString = value.toString();
    // split string
    let splitNewString = valueToString.split("");
    // get length of newString
    let getLength = splitNewString.length;
    // create holder 
    let holder = 0; 
    // loop over each item, multiply each item by length, add totals
    for (let i = 0; i < getLength; i = i + 1) {
        holder = holder + (splitNewString[i] ** getLength)
    }
        if (value == holder) {
            return true;
        } else {
            return false;
        }
    }
console.log(narcissistic(153));
