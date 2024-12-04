const fs = require('fs')

const file = fs.readFileSync('inputs/day4.txt', 'utf8')

console.log('part 1: ', countNumOfXmases(file))
console.log('part 2: ', countNumOfCrossMases(file))

function countNumOfXmases(raw: string) {
    const wordToFind = ['X', 'M', 'A', 'S']
    const matrix = raw.split("\n").map(a => a.split(''))
    let numFound = 0

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            findXmases(row, col, 0)
        }
    }

    function findXmases(row: number, col: number, charIndex: number, direction?: string) {
        if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length ||
            matrix[row][col] != wordToFind[charIndex]) {
            return
        }
        if (charIndex == wordToFind.length - 1) {
            numFound++
            return
        }

        // you can only find words along a single direction, no zig-zagging allowed
        // don't need to track visited because we're only exploring in one direction at a time
        charIndex++
        if (direction === undefined) {
            findXmases(row + 1, col, charIndex, "N")
            findXmases(row + 1, col + 1, charIndex, "NE")
            findXmases(row, col + 1, charIndex, "E")
            findXmases(row - 1, col + 1, charIndex, "SE")
            findXmases(row - 1, col, charIndex, "S")
            findXmases(row - 1, col - 1, charIndex, "SW")
            findXmases(row, col - 1, charIndex, "W")
            findXmases(row + 1, col - 1, charIndex, "NW")
        } else if (direction === "N") {
            findXmases(row + 1, col, charIndex, "N")
        } else if (direction === "NE") {
            findXmases(row + 1, col + 1, charIndex, "NE")
        } else if (direction === "E") {
            findXmases(row, col + 1, charIndex, "E")
        } else if (direction === "SE") {
            findXmases(row - 1, col + 1, charIndex, "SE")
        } else if (direction === "S") {
            findXmases(row - 1, col, charIndex, "S")
        } else if (direction === "SW") { 
            findXmases(row - 1, col - 1, charIndex, "SW")
        } else if (direction === "W") {
            findXmases(row, col - 1, charIndex, "W")
        } else if (direction === "NW") {
            findXmases(row + 1, col - 1, charIndex, "NW")
        }
    }

    return numFound
}

function countNumOfCrossMases(raw: string) {
    const matrix = raw.split("\n").map(a => a.split(''))
    let numTwoMases = 0

    for (let row = 1; row < matrix.length - 1; row++) {
        for (let col = 1; col < matrix[0].length - 1; col++) {
            if (matrix[row][col] == 'A') {
                // Ms on bottom, Ss on top
                if (matrix[row + 1][col - 1] == 'M' && matrix[row + 1][col + 1] == 'M' && matrix[row - 1][col + 1] == 'S' && matrix[row - 1][col - 1] == 'S') numTwoMases++
                // Ms on right, Ss on left
                if (matrix[row + 1][col - 1] == 'S' && matrix[row + 1][col + 1] == 'M' && matrix[row - 1][col + 1] == 'M' && matrix[row - 1][col - 1] == 'S') numTwoMases++
                // Ms on top, Ss on bottom
                if (matrix[row + 1][col - 1] == 'S' && matrix[row + 1][col + 1] == 'S' && matrix[row - 1][col + 1] == 'M' && matrix[row - 1][col - 1] == 'M') numTwoMases++
                // Ms on left, Ss on right
                if (matrix[row + 1][col - 1] == 'M' && matrix[row + 1][col + 1] == 'S' && matrix[row - 1][col + 1] == 'S' && matrix[row - 1][col - 1] == 'M') numTwoMases++
            }
        }
    }

    return numTwoMases
}