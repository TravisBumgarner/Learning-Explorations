/*
Challenge:
[5, 28, 3, 2, 50, 80]

sort
[1,2,3,5,28,50,80], 78

1-80 => -79

*/

function pairWithGivenDifference(list, diff) {
    const absDiff = Math.abs(diff)
    list.sort((a, b) => a - b) /* n > 10 ? n*log(n) : n^2 */
    let leftIndex = 0
    let rightIndex = list.length - 1

    while (true) {
        const leftVal = list[leftIndex]
        const rightVal = list[rightIndex]
        const localAbsDiff = Math.abs(leftVal - rightVal)

        if (localAbsDiff === absDiff) {
            return [leftVal, rightVal]
        }

        if (leftIndex + 1 === rightIndex || leftIndex === rightIndex) {
            return []
        }

        const nextLeftValDiff = list[leftIndex + 1] - list[leftIndex]
        const nextRightValDiff = list[rightIndex] - list[rightIndex - 1]

        nextLeftValDiff > nextRightValDiff || nextLeftValDiff === nextRightValDiff
            ? rightIndex -= 1
            : leftIndex += 1
    }
}


console.log([1, 1], pairWithGivenDifference([1, 1], 0))
console.log([2, 80], pairWithGivenDifference([1, 2, 3, 5, 28, 50, 80], 78))
console.log([1, 6], pairWithGivenDifference([1, 2, 6], -5))
console.log([-5, 5], pairWithGivenDifference([-5, 5], 10))

/*
    Worst Case: n**2
    with pairwise comparing of i and j = i + 1 -> length
*/

/*
    My Solution:
    n
*/