import { IncomingMessage } from "http"

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

function isSafe(nums: number[], levelAlreadyRemoved: boolean = false) {
    let prev = nums[0]
    const shouldDecrease = nums[0] > nums[nums.length - 1]
    const shouldIncrease = !shouldDecrease

    for (let i = 1; i < nums.length; i++) {
        const curr = nums[i]
        const deltaFromPrev = Math.abs(prev - curr)
        const currBreaksRules = (shouldDecrease && curr >= prev) ||
            (shouldIncrease && curr <= prev) ||
            deltaFromPrev > 3
        if (!currBreaksRules) {
            prev = curr
            continue
        }

        if (levelAlreadyRemoved) return false
        else {
            const currRemoved = [...nums.slice(0, i), ...nums.slice(i + 1)]
            const prevRemoved = [...nums.slice(0, i - 1), ...nums.slice(i)]
            return isSafe(currRemoved, true) || isSafe(prevRemoved, true)
        }
    }

    return true
}