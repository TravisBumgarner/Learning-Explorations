/* Given a list of strings, sort the strings by frequency. Print the top three most 
    frequent strings.
*/

const x = ['a', 'b', 'c', 'd', 'e', 'e', 'e', 'e', 'f', 'f', 'a', 'a', 'a', 'a', 'a', 'a']

const y = x.reduce((accum, val) => {
    Object.keys(accum).includes(val)
        ? accum[val] += 1
        : accum[val] = 1

    return accum
}, {})

Object
    .entries(y)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(
        ([a, b]) => console.log(a)
    )
