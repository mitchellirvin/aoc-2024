const fs = require('fs')

const file = fs.readFileSync('inputs/day3.txt', 'utf8')

const nums = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])

console.log(sumOfUncorruptedMultiplyInstructions(file))

function sumOfUncorruptedMultiplyInstructions(raw: string) {
    let i = 0

    let sumOfProducts = 0
    while (i < raw.length) {
      if (raw.slice(i, i + 4) !== 'mul(') {
        i++
        continue
      }

      i += 4
      let j = i
      while (nums.has(raw[j])) {
        j++
      }
      if (j == i || j - i > 3 || raw[j] !== ',') continue
      const first = parseInt(raw.slice(i, j), 10)

      j++
      i = j
      while (nums.has(raw[j])) {
        j++
      }
      if (j == i || j - i > 3 || raw[j] !== ')') continue
      const second = parseInt(raw.slice(i, j), 10)

      sumOfProducts += (first * second)
      i = j
    }

    return sumOfProducts
}