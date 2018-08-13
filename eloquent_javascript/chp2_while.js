let i = 0

while(true){
    console.log('start-iteration')
    i++
    if ( i % 10 === 0 ) {
        break
    }
    if (i % 2){
        continue
    }
    console.log(i)
    console.log('end-iteration')
}
console.log('end-while')