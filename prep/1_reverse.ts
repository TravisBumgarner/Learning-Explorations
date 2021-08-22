// Take a string and reverse it

const reverseString = (s: string): string => {
    let output = ''


    for (const char of s){
        output =  char + output;
    }
    return output
}

;[
    ["aaa", "aaa"],
    ["abc", "cba"],
    ["abba", "abba"],
    ["", ""],
    ["abcd", "dcba"]
].forEach(([input, output]) => {
    console.log(reverseString(input), output, reverseString(input) === output)
})