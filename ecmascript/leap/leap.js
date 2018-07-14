/**
 * Clean Code Thoughts:
 * 
 * Ordering of these statements hides intent, or does it? 
 * Feels like domain knowledge might be required... would
 * have to learn how a leap year works first.
 * 
 * I'm not sure how I feel about calling this a year.
 */

class Year {
    constructor(input){
        this.value = input;
    }

    isLeap() {
        // How leap years work:
        // http://www.youtube.com/watch?v=xX96xng7sAE
        return (
            this.value % 400 === 0
            || ( this.value % 4 === 0 && this.value % 100 !== 0 )
        )
    }
}

export default Year;