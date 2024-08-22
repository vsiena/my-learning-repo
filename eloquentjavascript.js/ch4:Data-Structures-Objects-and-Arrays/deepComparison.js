/* Write a function deepEqual that takes two values 
and returns true only if they are the same value or are objects with the same properties, 
where the values of the properties are equal when compared with a recursive call to deepEqual. 

To find out whether values should be compared directly (using the === operator for that) 
or have their properties compared, you can use the typeof operator. 
If it produces "object" for both values, you should do a deep comparison. 
But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".

The Object.keys function will be useful when you need to go over the properties of objects to compare them.

Hint:

Your test for whether you are dealing with a real object will 
look something like typeof x == "object" && x != null. 
Be careful to compare properties only when both arguments are objects. 
In all other cases you can just immediately return the result of applying ===.

Use Object.keys to go over the properties. 
You need to test whether both objects have the same set of property names 
and whether those properties have identical values. 
One way to do that is to ensure that both objects have 
the same number of properties (the lengths of the property lists are the same). 
And then, when looping over one of the object’s properties to compare them, 
always first make sure the other actually has a property by that name. 
If they have the same number of properties and all properties in one also exist in the other, 
they have the same set of property names.

Returning the correct value from the function is best done 
by immediately returning false when a mismatch is found and returning true at the end of the function.*/


let obj = {here: {is: "an"}, object: 2};

// your code here
console.log(typeof(obj))
console.log(typeof(obj.here))
console.log(typeof(obj.here.is))
console.log(typeof(obj.object))
console.log(Object.keys(obj));

function deepEqual(a, b) {
    if (a === b) return true;
    
    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object") return false;
  
    let keysA = Object.keys(a), keysB = Object.keys(b);
  
    if (keysA.length != keysB.length) return false;
  
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
  
    return true;
  }
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// // → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// // → true

/* 

Breakdown

Function Purpose: 
This function checks if two values (a and b) are deeply equal. 
Deep equality means that not only the values are equal, but if they are objects, 
their properties must also be equal recursively.

Checking Direct Equality: 
if (a === b) return true; checks if a and b are strictly equal (e.g., same reference or value).

Checking Non-Object Types: 
The function then checks if either a or b is null or not of type "object". 
If so, it returns false because they cannot be deeply equal if one or both are not objects.

Comparing Object Keys: 
It gets the keys of both objects with Object.keys() and 
checks if they have the same length. If not, the objects are not equal.

Recursively Checking Properties: 
It loops through the keys of the first object (keysA) and checks 
if each key exists in the second object (keysB). 
It then recursively checks if the values of these keys are deeply equal by calling deepEqual(a[key], b[key]).

Return True: 
If all checks pass, the function returns true, indicating the objects are deeply equal.
*/