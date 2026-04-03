import * as readline from "readline";


// function palindrome(s: string) {
//     s = s.toLowerCase().replace(/\s+/g, ""); // Convert to lowercase and remove spaces
//     return s === s.split("").reverse().join(""); // Compare with reversed string
// }


// const string = process.argv[2];
// if (string) {
//     if (palindrome(string)) {
//         console.log("The word is a palindrome!");
//     } else {
//         console.log("The word is not a palindrome.");
//     }
// }




// Define the function
function palindrome(s: string): boolean {
  s = s.toLowerCase().replace(/\s+/g, "");
  return s === s.split("").reverse().join("");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a word: ", (input: string) => {
  if (palindrome(input)) {
    console.log("The word is a palindrome!");
  } else {
    console.log("The word is not a palindrome.");
  }
  rl.close();
});
