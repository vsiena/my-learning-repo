/* 

https://www.codewars.com/kata/520b9d2ad5c005041100000f/train/javascript

Move the first letter of each word to the end of it, 
then add "ay" to the end of the word. 
Leave punctuation marks untouched.

pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
pigIt('Hello world !');     // elloHay orldway !

*/



function pigIt(str) {
    // Split the string into words
    let words = str.split(' ');
    const extendedPunctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()'"<>?@\[\\\]\|+]/;
    // Process each word
    let processedWords = words.map(word => {
        if (word.length > 1) {
            return word.slice(1) + word[0] + "ay";
        } else {
            if (extendedPunctuationRegex.test(word)) {
                return word;
            } else {
                return word + "ay";
            }
        }
    });
    return processedWords.join(' ');
}

console.log(pigIt('Pig latin is cool'))
console.log(pigIt('Hello world ?'));