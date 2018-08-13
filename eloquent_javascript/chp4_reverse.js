function arrayReverse(input){
    const midpoint = Math.floor(input.length / 2)
    for (let i = 0; i < midpoint; i++){
        [input[input.length - 1 - i], input[i]] = [input[i], input[input.length - 1 - i]]
    }
}

function inplaceArrayReverse(input){
    const midpoint = Math.floor(input.length / 2)
    let leftIndex = 0
    let rightIndex = input.length - 1
    
    while(leftIndex < midpoint){
        [input[leftIndex], input[rightIndex]] = [input[rightIndex], input[leftIdx]]
        leftIdx++
        rightIdx--
    }
}

function inplaceArrayReverse2(input){
    let leftIndex = 0
    let rightIndex = input.length - 1
    
    while(leftIndex < rightIndex){
        [input[leftIndex], input[rightIndex]] = [input[rightIndex], input[leftIndex]]
        leftIndex++
        rightIndex--
    }
}

x = [1,2,3,4]
inplaceArrayReverse2(x)
console.log(x)