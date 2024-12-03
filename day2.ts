import { IncomingMessage } from "http"

const fs = require('fs')

const file = fs.readFileSync('inputs/day2.txt', 'utf8')

console.log(numberOfSafeLevels(file))

function numberOfSafeLevels(raw: string) {
    const levels = raw.split('\n')
    let numSafe = 0

    for (const level of levels) {
        const nums = level.split(' ').map(a => parseInt(a, 10))
        if (isSafe(nums, false)) numSafe++
    }

    return numSafe
}

function isSafe(nums: number[], isDampened: boolean) {
    let prev = nums[0]
    const shouldDecrease = nums[0] > nums[nums.length - 1]
    const shouldIncrease = !shouldDecrease

    for (let i = 1; i < nums.length; i++) {
        const delta = Math.abs(prev - nums[i])
        if ((shouldDecrease && nums[i] >= prev) ||
            (shouldIncrease && nums[i] <= prev) || 
            delta > 3) {
            if (isDampened) return false
            else {
                const currRemoved = [...nums.slice(0, i), ...nums.slice(i + 1)]
                const prevRemoved = [...nums.slice(0, i - 1), ...nums.slice(i)]
                return isSafe(currRemoved, true) || isSafe(prevRemoved, true)
            }
        }
        prev = nums[i]
    }

    return true
}