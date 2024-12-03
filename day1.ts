const fs = require('fs')

const file = fs.readFileSync('inputs/day1.txt', 'utf8')

console.log(pairwiseDistanceSum(file))
console.log(similarityScore(file))

function pairwiseDistanceSum(raw: string) {
  const list1: number[] = []
  const list2: number[] = []
  
  for (const line of raw.split('\n')) {
    const [el1, el2] = line.split('   ')
    list1.push(parseInt(el1, 10))
    list2.push(parseInt(el2, 10))
  }
  
  list1.sort()
  list2.sort()
  
  let distanceSum = 0
  for (let i = 0; i < list1.length; i++) {
    distanceSum += Math.abs(list1[i] - list2[i])
  }
  return distanceSum
}

function similarityScore(raw: string) {
  const list1: number[] = []
  const map2 = new Map<number, number>()
  
  for (const line of raw.split('\n')) {
    const [el1, el2] = line.split('   ')
    list1.push(parseInt(el1, 10))
    const num2 = parseInt(el2, 10)
    map2.set(num2, (map2.get(num2) ?? 0) + 1)
  }

  let score = 0
  for (const num of list1) {
    score += num * (map2.get(num) ?? 0)
  }
  return score
}
