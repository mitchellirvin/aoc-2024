const fs = require('fs')

const file = fs.readFileSync('inputs/day2.txt', 'utf8')

console.log(numberOfSafeLevels(file))

function numberOfSafeLevels(raw: string) {
    const levels = raw.split('\n')
    let numSafe = 0

    for (const level of levels) {
      const nums = level.split(' ').map(a => parseInt(a, 10))
      if (isSafe(nums)) numSafe++
    }

    return numSafe
}

function isSafe(nums: number[]) {
  let prev: number | null = null
  const isDecreasing = nums[0] > nums[nums.length - 1]

  for (let i = 0; i < nums.length; i++) {
    if (prev == null) {
      prev = nums[i]
      continue
    }

    if (isDecreasing) {
      if (nums[i] >= prev || prev - nums[i] > 3) return false
    } else {
      if (nums[i] <= prev || nums[i] - prev > 3) return false
    }
    prev = nums[i]
  }

  return true
}