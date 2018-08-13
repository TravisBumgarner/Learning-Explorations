const R = require('ramda')
// output a chessboard.


function buildChessboard(size){
        rowIndex = 0
        rowValue = ""

    const evenRow = R.range(0, size).map(index => {
        return index % 2 ? '#' : ' '
    })

    const oddRow = R.range(0, size).map(index => {
        return index % 2 ? ' ' : '#'
    })

    R.range(0, size).map(index => {
        console.log(index % 2 ? oddRow : evenRow)
    })
}

// Probably the shortest this could be. Not so clean though. 
function buildChessboard2(size){
    R.range(0, size).map(row => {
        console.log(R.range(0, size).map(col => (row + col) % 2 === 0 ? '#' : ' '))
    })
}

buildChessboard2(8)